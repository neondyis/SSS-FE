import {Component, OnInit} from '@angular/core';
import Konva from 'konva';
import {ShapeService} from "../../service/shape.service";
import {TextService} from "../../service/text.service";
import {ActivatedRoute} from "@angular/router";
import {PassportService} from "../../service/passport.service";
import {Vacuum} from "../../interface/Vacuum";
import {History} from "../../interface/History";
import {Passport} from "../../interface/Passport";
import { DateTime } from 'luxon';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {
  stage1!: Konva.Stage;
  stage2!:Konva.Stage;
  stage3!:Konva.Stage;
  stage4!:Konva.Stage;
  layer1!: Konva.Layer;
  layer2!: Konva.Layer;
  layer3!: Konva.Layer;
  layer4!: Konva.Layer;
  shapes: any = [];
  transformers: Konva.Transformer[] = [];
  stageWidth: number = 0;
  height: number = 0;
  vacuum: Vacuum = <Vacuum>{};
  serviceHistory: History[] = [];

  constructor(private shapeService: ShapeService,
              private textService: TextService,
              private passportService: PassportService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const passportIdFromRoute = String(routeParams.get('_id'));

    this.stageWidth = window.innerWidth;
    this.height = window.innerHeight;

    this.passportService.getPassport(passportIdFromRoute).subscribe(async (res:Passport) => {
      this.vacuum = await res.vacuum;
      this.serviceHistory = res.timeline;
      initCanvas();
    });

    const initCanvas = () => {
      // Stage Init
      this.stage1 = new Konva.Stage({
        height : this.height,
        width : this.stageWidth,
        container: 'passport-container-1',
      });
      this.stage2 = new Konva.Stage({
        height : this.height,
        width : this.stageWidth,
        container: 'passport-container-2',
      });
      this.stage3 = new Konva.Stage({
        height : this.height,
        width : this.stageWidth,
        container: 'passport-container-3',
      });
      this.stage4 = new Konva.Stage({
        height : this.height,
        width : this.stageWidth,
        container: 'passport-container-4',
      });

      // Layer Init
      this.layer1 = new Konva.Layer();
      this.layer2 = new Konva.Layer();
      this.layer3 = new Konva.Layer();
      this.layer4 = new Konva.Layer();

      // First Page Init
      this.initBackground(this.layer1,this.stage1);
      this.initStickers();
      this.addHorizontalSeparator(420,this.layer1,6);
      this.initFirstPage();

      // Second Page Init
      this.initBackground(this.layer2,this.stage2);
      this.initSecondPage();
      this.addHorizontalSeparator(500,this.layer2,6);

      // Third Page Init
      this.initBackground(this.layer3,this.stage3);
      this.initThirdPage();
      this.addHorizontalSeparator(500,this.layer3,6);

      // Fourth Page Init
      this.initBackground(this.layer4,this.stage4);
      this.initFourthPage();
      this.addHorizontalSeparator(500,this.layer4,6);
      // Stage Init
      this.stage1.add(this.layer1);
      this.stage2.add(this.layer2);
      this.stage3.add(this.layer3);
      this.stage4.add(this.layer4);

      // Transformation listeners init
      this.addTransformerListeners(this.layer1,this.stage1);
      this.addTransformerListeners(this.layer2,this.stage2);
      this.addTransformerListeners(this.layer3,this.stage3);
      this.addTransformerListeners(this.layer4,this.stage4);

      // Auto scaling listener
      this.fitStageIntoParentContainer(this.stage1);
      this.fitStageIntoParentContainer(this.stage2);
      this.fitStageIntoParentContainer(this.stage3);
      this.fitStageIntoParentContainer(this.stage4);

      // adapt the stage on any window resize
      window.addEventListener('resize', _ => {
        this.fitStageIntoParentContainer(this.stage1);
        this.fitStageIntoParentContainer(this.stage2);
        this.fitStageIntoParentContainer(this.stage3);
        this.fitStageIntoParentContainer(this.stage4);
      });
    };
  }

  addTransformerListeners(layer:Konva.Layer,stage:Konva.Stage) {
    const component = this;
    const tr = new Konva.Transformer();

    stage.on('click', function (e) {
      if (!this._mouseClickStartShape) {
        return;
      }
      if (e.target._id == this._mouseClickStartShape._id) {
        component.addDeleteListener(e.target,layer);
        layer.add(tr);
        tr.attachTo(e.target);
        component.transformers.push(tr);
        layer.draw();
      } else {
        tr.detach();
        layer.draw();
      }
    });
  }

  initStickers() {
    this.shapeService.sticker(92, 30, '../../assets/passport/icons/garantie.png', 120, 120, true, this.layer1);
    this.shapeService.sticker(330, 30, '../../assets/passport/icons/tick.png', 120, 120, true, this.layer1);
    this.shapeService.sticker(550, 30, '../../assets/passport/icons/energy.png', 130, 120, true, this.layer1);
    this.shapeService.sticker(800, 30, '../../assets/passport/icons/sound.png', 120, 120, true, this.layer1);
    this.shapeService.sticker(105, 180, '../../assets/passport/icons/year.png', 90, 90, true, this.layer1);
    this.shapeService.sticker(460, 180, '../../assets/passport/icons/weight.png', 90, 90, true, this.layer1);
    this.shapeService.sticker(812, 180, '../../assets/passport/icons/visual.png', 90, 90, true, this.layer1);
    this.shapeService.sticker(100, 303, '../../assets/passport/icons/barcode.png', 90, 90, true, this.layer1);
    this.shapeService.sticker(460, 303, '../../assets/passport/icons/generatedRepairs.png', 90, 90, true, this.layer1);
    this.shapeService.sticker(817, 303, '../../assets/passport/icons/test.png', 90, 90, true, this.layer1);
  }

  addDeleteListener(shape: any,layer:Konva.Layer) {
    const component = this;
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Delete') {
        shape.remove();
        component.transformers.forEach(t => {
          t.detach();
        });
        const selectedShape = component.shapes.find((s: any) => s._id == shape._id);
        selectedShape.remove();
        e.preventDefault();
      }
      layer.batchDraw();
    });
  }

  initBackground(layer:Konva.Layer, stage:Konva.Stage){
    // another solution is to use rectangle shape
    const background = new Konva.Rect({
      x: 0,
      y: 0,
      width: stage.width(),
      height: stage.height(),
      // illLinearGradientStartPoint: {x: 0, y: 0},
      // fillLinearGradientEndPoint: {x: stage.width(), y: stage.height()},
      // fillLinearGradientColorStops: [
      //   0,
      //   'yellow',
      //   0.5,
      //   'blue',
      //   0.6,
      //   'rgba(0, 0, 0, 0)',
      // ],
      fill: 'whitesmoke',
      // remove background from hit graph for better perf
      // because we don't need any events on the background
      listening: false,
    });
    layer.add(background);
  }

  initFirstPage() {
    const pageTitle = this.textService.simpleTextNode(this.stage1.width()/5, 450, "INFOWASPORT", 20, 200, '#9bcde0', true);

    this.shapeService.sticker(20, 470+90, `${environment.BASEAPI}image/${this.vacuum.front}`, 190, 250, true,this.layer1);

    const productMaker = this.textService.simpleTextNode(285, 670+90, "Merk", 20, 200, '#9bcde0', true);
    const productMarkerContent = this.textService.simpleTextNode(285, 690+90, this.vacuum.series.brand.name, 20, 200, '#000000', true);
    this. shapeService.sticker(220, 650+90, '../../assets/passport/icons/visual.png', 60, 60, true, this.layer1);


    const productName = this.textService.simpleTextNode(285, 497+90, "Naam", 20, 200, '#9bcde0', true);
    const productNameContent = this.textService.simpleTextNode(285, 520+90, this.vacuum.model, 20, 200, '#000000', true);
    this. shapeService.sticker(220, 475+90, '../../assets/passport/icons/visual.png', 60, 60, true, this.layer1);

    const productYear = this.textService.simpleTextNode(285, 591+90, "Bouwjaar", 20, 200, '#9bcde0', true);
    const productYearContent = this.textService.simpleTextNode(285, 615+90, this.vacuum.year, 20, 200, '#000000', true);
    this. shapeService.sticker(220, 570+90, '../../assets/passport/icons/visual.png', 60, 60, true, this.layer1);

    const serialNumber = this.textService.simpleTextNode(645, 497+90, "Serienummer", 20, 200, '#9bcde0', true);
    const serialNumberContent = this.textService.simpleTextNode(645, 520+90, this.vacuum.serialNumber.toString(), 20, 200, '#000000', true);
    this. shapeService.sticker(580, 477+90, '../../assets/passport/icons/barcode.png', 60, 60, true, this.layer1);

    const noiseLevel = this.textService.simpleTextNode(645, 570+90, "Geluids en trillings niveau", 20, 200, '#9bcde0', true);
    const noiseLevelContent = this.textService.simpleTextNode(645, 620+90, this.vacuum.noiseLvl.toString(), 20, 200, '#000000', true);
    this. shapeService.sticker(580, 560+90, '../../assets/passport/icons/sound.png', 60, 60, true, this.layer1);

    const typeNumber = this.textService.simpleTextNode(645, 690+90, "Typenummer", 20, 200, '#9bcde0', true);
    const typeNumberContent = this.textService.simpleTextNode(645, 715+90,  this.vacuum.serialNumber.toString().substring(0,5), 20, 200, '#000000', true);
    this. shapeService.sticker(580, 670+90, '../../assets/passport/icons/barcode.png', 60, 60, true, this.layer1);

    const footer = this.textService.simpleTextNode(20, 941, `P<NLDDE<${this.vacuum.series.brand.name.toUpperCase()}<<.WSD<3<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< \n` +
      `SPECI2020NL>E-NR:WRV359DRGJNERG3I48JNS38549<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`, 20, 980, '#000000', true);

    this.layer1.add(pageTitle, productMaker, productName, productYear, serialNumber, noiseLevel,typeNumber);
    this.layer1.add(productMarkerContent,productNameContent,productYearContent,serialNumberContent,noiseLevelContent,typeNumberContent);
    this.layer1.add(footer);
  }

  initSecondPage() {
    const pageTitle = this.textService.simpleTextNode(this.stage1.width()/5, 520, "INFOWASPORT", 20, 200, '#9bcde0', true);

    // Stickers for the page
    this.shapeService.sticker(62, 25, '../../assets/passport/icons/energy.png', 200, 200, true, this.layer2);
    this.shapeService.sticker(550 , 25, '../../assets/passport/icons/wind.png', 200, 200, true, this.layer2);
    this.shapeService.sticker(680 , 650, '../../assets/passport/icons/bulb.png', 200, 200, true, this.layer2);

    // Line Separators for the page
    this.addHorizontalSeparator(250,this.layer2,2);
    this.addVerticalSeparator(-6,(this.stage2.width()/4)-6,this.layer2,2,500);
    this.addVerticalSeparator(-6,(this.stage2.width()/4)-6,this.layer2,2,500);
    this.addVerticalSeparator(600,(this.stage2.width()/4)-150,this.layer2,2,900);
    this.addVerticalSeparator(600,(this.stage2.width()/4)+150,this.layer2,2,900);




    const footer = this.textService.simpleTextNode(20, 941, `P<NLDDE<${this.vacuum.series.brand.name.toUpperCase()}<<.WSD<3<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< \n` +
      `SPECI2020NL>E-NR:WRV359DRGJNERG3I48JNS38549<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`, 20, 980, '#000000', true);

    this.layer2.add(pageTitle);
    this.layer2.add(footer)
  }

  initThirdPage() {

    // Title/Subtitles for the page
    const pageTitle1 = this.textService.simpleTextNode(20, 520, "INFOWASPORT", 20, 200, '#9bcde0', true);
    const subTitle1 = this.textService.simpleTextNode((this.stage1.width()/5), 50, "Visuele staat", 20, 200, '#9bcde0', true);
    const pageTitle2 = this.textService.simpleTextNode(20, 20, "INFOWASPORT", 20, 200, '#9bcde0', true);
    const subTitle2 = this.textService.simpleTextNode((this.stage1.width()/5)+35, 550, "Slijtage", 20, 200, '#9bcde0', true);

    // Stickers for the page
    this.shapeService.sticker((this.stage1.width()/5)-45, 40, '../../assets/passport/icons/test.png', 40, 40, true, this.layer3);
    this.shapeService.sticker((this.stage1.width()/5)-10, 540, '../../assets/passport/icons/test.png', 40, 40, true, this.layer3);

    // Device Picture Boxes
    this.shapeService.sticker(75, 130, `${environment.BASEAPI}image/${this.vacuum.front}`, 200, 300,  true,this.layer3);

    this.shapeService.sticker(400, 130, `${environment.BASEAPI}image/${this.vacuum.back}`, 200, 300,  true,this.layer3);

    this.shapeService.sticker(700, 130, `${environment.BASEAPI}image/${this.vacuum.side}`, 200, 300,  true,this.layer3);


    const wear = this.shapeService.rectangle(55, 610, 860, 300, '#9bcde0', 5, true,true);

    const footer = this.textService.simpleTextNode(20, 941, `P<NLDDE<${this.vacuum.series.brand.name.toUpperCase()}<<.WSD<3<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< \n` +
      `SPECI2020NL>E-NR:WRV359DRGJNERG3I48JNS38549<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`, 20, 980, '#000000', true);

    this.layer3.add(wear);
    this.layer3.add(pageTitle1,pageTitle2,subTitle1,subTitle2);
    this.layer3.add(footer)
    this.serviceHistory.forEach(history => history.service.notes.forEach((note,index)=>
    {
      this.shapeService.sticker(93,660+(120*index),`${environment.BASEAPI}image/${note.image}`,100,100,true,this.layer3);
      const wearContent = this.textService.simpleTextNode(225,660+(120*index),note.content,30,500,'#000000',true);
      this.layer3.add(wearContent);
    }));
  }

  initFourthPage() {
    const pageTitle1 = this.textService.simpleTextNode(20, 520, "INFOWASPORT", 20, 200, '#9bcde0', true);
    const subTitle1 = this.textService.simpleTextNode((this.stage1.width()/5), 50, "Exploded view", 20, 200, '#9bcde0', true);
    const pageTitle2 = this.textService.simpleTextNode(20, 20, "INFOWASPORT", 20, 200, '#9bcde0', true);
    const subTitle2 = this.textService.simpleTextNode((this.stage1.width()/5), 550, "Historie van onderhoud", 20, 300, '#9bcde0', true);

    this.shapeService.sticker((this.stage1.width()/5)-45, 40, '../../assets/passport/icons/generatedRepairs.png', 40, 40, true, this.layer4);
    this.shapeService.sticker((this.stage1.width()/5)-45, 540, '../../assets/passport/icons/generatedRepairs.png', 40, 40, true, this.layer4);


    // Schematics
    this.shapeService.sticker(75,130,'../../assets/passport/icons/c_schematic_4.png',200,300,false,this.layer4);
    this.shapeService.sticker(400,130,'../../assets/passport/icons/c_schematic_5.png',200,300,false,this.layer4);
    this.shapeService.sticker(700,130,'../../assets/passport/icons/c_schematic_6.png',200,300,false,this.layer4);

    // History Recap
    this.serviceHistory.forEach((history,index) => {
      const historyContainer = this.shapeService.rectangle(20, 600+(100*(index)), 900, 100, 'rgba(176,241,255,0.36)', 5, true,true);
      let repairText = '';
      history.service.generatedRepairs.forEach(repair => repairText += repair.issue.description + '\n');
      const date = DateTime.fromISO(history.service.createdAt.toString());
      const year = this.textService.simpleTextNode(45,635,date.year.toString(),40,100,'#000000',false);
      const serviceDescription = this.textService.simpleTextNode(170,635,repairText,25,600,'#000000',false);
      this.layer4.add(historyContainer, year,serviceDescription);
    });

    const footer = this.textService.simpleTextNode(20, 941, `P<NLDDE<${this.vacuum.series.brand.name.toUpperCase()}<<.WSD<3<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< \n` +
      `SPECI2020NL>E-NR:WRV359DRGJNERG3I48JNS38549<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`, 20, 980, '#000000', true);

    this.layer4.add(pageTitle1,pageTitle2,subTitle1,subTitle2);
    this.layer4.add(footer)
  }

  fitStageIntoParentContainer(stage:Konva.Stage) {
    const container = document.querySelector('#stage-parent');

    // now we need to fit stage into parent
    const containerWidth = window.innerWidth;
    // to do this we need to scale the stage
    let scaleX = containerWidth / this.stageWidth;

     // now we need to fit stage into parent
    const containerHeight = window.innerHeight;
    // to do this we need to scale the stage
    let scaleY = containerHeight / this.height;
    console.log(containerWidth + " x " + containerHeight);
    // uncomment to enable "uniform stretch"
    scaleX = scaleY = Math.min(scaleX,scaleY);

    stage.width((this.stageWidth * scaleX)*0.5);
    stage.height(this.height * scaleY);
    //TODO ADD CHECK FOR WIDTH TO APPLY SCALING
    stage.scale({x: scaleX, y: scaleY});

    // Stage background setting
    stage.container().style.backgroundColor = 'whitesmoke';

    stage.draw();
  }

  addHorizontalSeparator(y: number, layer:Konva.Layer, strokeWidth:number) {
    const line = this.shapeService.line([10, y, 40, y, 150, y, 250, y, 300, y, 400, y, 420, y, 450, y, 563, y,950,y], 'brush', 'black', strokeWidth, true);
    layer.add(line);
  }

  addVerticalSeparator(y: number, x:number, layer:Konva.Layer, strokeWidth:number,height:number) {
    const yAxis = this.shapeService.line([x,y,x,height],'brush', 'black', strokeWidth, true);
    layer.add(yAxis)
  }
}
