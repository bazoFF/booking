import { ModalController } from "@ionic/angular";

export abstract class ModalComponent {

  protected constructor(protected _modalController: ModalController) { }

  close(data?) {
    this._modalController.dismiss(data).then();
  }
}
