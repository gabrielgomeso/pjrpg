import type { IAttributes } from "./IAttributes";
import type { IStatus } from "./IStatus";
import type { IQuestions } from "./IQuestions";
import type { IAdvantage } from "./IAdvantage";

export interface ICharacter {
  name: string;
  appeareance: string;
  age: number;
  race: string;
  group: string;
  origin: string;
  questions: IQuestions;
  attributes: IAttributes;
  items: [];
  advantages: IAdvantage[];
  disadvantages: IAdvantage[];
  initialPowers: [];
  status: IStatus;
  level: number;
  experiencePoints: number;
  userId: string;
}
