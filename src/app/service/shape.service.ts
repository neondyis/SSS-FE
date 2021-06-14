import { Injectable } from '@angular/core';
import Konva from "konva";
import {Vector2d} from "konva/lib/types";

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor() { }

  circle(x:number, y:number, radius:number, stroke:string,strokeWidth:number,draggable:boolean) {
    return new Konva.Circle({
      x: x,
      y: y,
      radius: radius,
      stroke: stroke,
      strokeWidth: strokeWidth,
      draggable: draggable
    });
  }

  line(pos: number[], mode: string = 'brush',stroke:string ='red',strokeWidth:number = 2,draggable:boolean = false) {
    return new Konva.Line({
      stroke: stroke,
      lineCap: 'round',
      lineJoin: 'round',
      strokeWidth: strokeWidth,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',
      points: pos,
      dash: [29, 20, 0.001, 20],
      draggable: draggable
    });
  }

  rectangle(x:number, y:number, width:number, height:number ,stroke:string,strokeWidth:number,draggable:boolean=false,fill:boolean=false) {
    return new Konva.Rect({
      x: x,
      y: y,
      width: width,
      height: height,
      stroke: stroke,
      fill: !fill ? '#ffffff':stroke,
      strokeWidth: strokeWidth,
      draggable: draggable
    });
  }

  addDragListeners(shape:Konva.Node){
    shape.on('dragstart', function (e) {
      console.log(shape.name().toString(),shape.position())
    });
    shape.on('dragend', function (e) {
      console.log(shape.name().toString(),shape.position())
    });
  }

  sticker(x:number,y:number,src:string,width:number,height:number,draggable:boolean = false,layer:any){
    const imageObj = new Image();
    imageObj.onload = () => {
      const background = new Konva.Image({
        x: x,
        y: y,
        image: imageObj,
        width: width,
        height: height,
        draggable: draggable
      });
      this.addDragListeners(background);
      layer.add(background);
    };
    imageObj.src = src;
  }

}
