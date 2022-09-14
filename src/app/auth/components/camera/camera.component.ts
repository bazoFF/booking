import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "../modal.component";
import { ModalController } from "@ionic/angular";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions/ngx";
import { CameraPreview } from "@capacitor-community/camera-preview";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent extends ModalComponent implements OnInit {

  public images: string[] = [];
  public isRecording: boolean;

  constructor(protected _modalController: ModalController, private _permissionsService: AndroidPermissions) {
    super(_modalController);
  }

  async ngOnInit() {
    await this._setupPermissions();
    await this._startCamera();
  }

  public async takePhoto() {
    const capture = await CameraPreview.capture({quality: 100});
    this.images.push(capture.value);
  }

  public async flipCamera() {
    await CameraPreview.flip();
  }

  public async stopCamera() {
    await CameraPreview.stop();
    this.isRecording = false;
  }

  private async _setupPermissions() {
    await this._permissionsService.requestPermissions([
      this._permissionsService.PERMISSION.CAMERA,
      this._permissionsService.PERMISSION.READ_EXTERNAL_STORAGE,
      this._permissionsService.PERMISSION.WRITE_EXTERNAL_STORAGE
    ]);
  }

  private async _startCamera() {
    await CameraPreview.start({
      parent: "content",
      position: "rear",
      disableAudio: true
    });

    this.isRecording = true;
  }
}
