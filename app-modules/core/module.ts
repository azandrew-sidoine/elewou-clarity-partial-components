import { ISerializer, ISerializableBuilder } from 'src/app/lib/core/built-value/contracts/serializers';
import { ObjectSerializer, JsonProperty } from 'src/app/lib/core/built-value/core/serializers';
import { TypeBuilder, buildJSObjectType, rebuildJSObjectType } from 'src/app/lib/core/built-value/contracts/type';
import { Role } from 'src/app/lib/core/auth/models/role';
import { FormViewModel } from 'src/app/lib/core/components/dynamic-inputs/core/contracts/dynamic-form';

export class ModuleBuilder implements ISerializableBuilder<Module>, TypeBuilder<Module> {
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
  fromSerialized(serialized: any): Module {
    return this.serializer.deserialize(Module, serialized);
  }

  /**
   * @inheritdoc
   */
  toSerialized(value: Module) {
    return this.serializer.serialize(Module, value);
  }

  /**
   * @inheritdoc
   */
  build(bluePrint: new () => Module, params: object): Module {
    return buildJSObjectType(bluePrint, params);
  }

  /**
   * @inheritdoc
   */
  rebuild(instance: Module, params: object | Module): Module {
    return rebuildJSObjectType(instance, params);
  }

}


export class Module implements FormViewModel {
  @JsonProperty('id')
  id: string = undefined;
  @JsonProperty('name')
  name: string = undefined;
  @JsonProperty('description')
  description: string = undefined;
  @JsonProperty('url')
  url: string = undefined;
  @JsonProperty('is_active')
  isActive: number = undefined;
  @JsonProperty('icon_path')
  iconPath: number = undefined;
  @JsonProperty({ name: 'roles', valueType: Role })
  roles: Role[] = undefined;
  /**
   * @param data Instance initializer of object type
   */
  constructor() { }

  /**
   * @description Calls to get the builder provider of the current class|type
   */
  static builder(): TypeBuilder<Module> | ISerializableBuilder<Module> {
    return new ModuleBuilder();
  }

  /**
   * @inheritdoc
   */
  formViewModelBindings(): { [index: string]: any } {
    return {
      name: 'name',
      description: 'description',
      url: 'url',
      is_active: 'isActive',
      icon_path: 'iconPath',
      roles: 'roles'
    };
  }
}
