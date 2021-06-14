import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import  QRCodeStyling   from 'qr-code-styling';

@Component({
  selector: 'app-qrdialog',
  templateUrl: './qrdialog.component.html',
  styleUrls: ['./qrdialog.component.scss']
})
export class QRDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<QRDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: `https://sss-fe.vercel.app/passport/${this.data}`,
      image: '../../assets/passport/icons/logo.png',
      dotsOptions: {
        color: "#4267b2",
        type: "rounded"
      },
      backgroundOptions: {
        color: "#e9ebee",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
      }
    });

    // @ts-ignore
    qrCode.append(document.getElementById("canvas"));
  }

}
