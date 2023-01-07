import type { IAttributes } from "./IAttributes";
import type { IStatus } from "./IStatus";
import type { ICharacterData } from "./ICharacterData";

export interface ICharacter {
  attributes: IAttributes;
  status: IStatus;
  character_data: ICharacterData;
}
