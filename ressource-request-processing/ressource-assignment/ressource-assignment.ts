import { ISerializableBuilder, ISerializer, TypeBuilder } from 'src/app/lib/built-value/contracts';
import { buildJSObjectType, rebuildJSObjectType } from 'src/app/lib/built-value/contracts/type';
import { JsonProperty, ObjectSerializer } from 'src/app/lib/built-value/core/serializers';


export class DrewlabsRessourceAssignmentBuilder implements
  ISerializableBuilder<DrewlabsRessourceAssignment>, TypeBuilder<DrewlabsRessourceAssignment> {
  serializer: ISerializer;

  /**
   *
   */
  constructor() {
    this.serializer = new ObjectSerializer();
  }

  /**
   * @inheritdoc
   */
  fromSerialized(serialized: any): DrewlabsRessourceAssignment {
    return this.serializer.deserialize(DrewlabsRessourceAssignment, serialized);
  }

  /**
   * @inheritdoc
   */
  toSerialized = (value: DrewlabsRessourceAssignment) => {
    return this.serializer.serialize(DrewlabsRessourceAssignment, value);
  }

  /**
   * @inheritdoc
   */
  build(bluePrint: new () => DrewlabsRessourceAssignment, params: object): DrewlabsRessourceAssignment {
    return buildJSObjectType(bluePrint, params);
  }

  /**
   * @inheritdoc
   */
  rebuild(instance: DrewlabsRessourceAssignment, params: object | DrewlabsRessourceAssignment): DrewlabsRessourceAssignment {
    return rebuildJSObjectType(instance, params);
  }

}


export class DrewlabsRessourceAssignment {

  @JsonProperty('id')
  id: number = undefined;
  @JsonProperty('ressource_id')
  ressourceID: number = undefined;
  @JsonProperty('assigned_by')
  assignedBy: number = undefined;
  @JsonProperty('assigned_to')
  assignedTo: number = undefined;

  /**
   * @param data Instance initializer of object type
   */
  constructor() { }

  /**
   * @description Calls to get the builder provider of the current class|type
   */
  static builder(): TypeBuilder<DrewlabsRessourceAssignment> | ISerializableBuilder<DrewlabsRessourceAssignment> {
    return new DrewlabsRessourceAssignmentBuilder();
  }

  /**
   * @inheritdoc
   */
  formViewModelBindings(): { [index: string]: any } {
    return (DrewlabsRessourceAssignment.builder() as ISerializableBuilder<DrewlabsRessourceAssignment>).toSerialized(this);
  }
}
