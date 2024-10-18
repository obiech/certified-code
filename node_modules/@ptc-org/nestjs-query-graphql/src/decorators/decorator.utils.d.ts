export type ComposableDecorator = MethodDecorator | PropertyDecorator | ClassDecorator | ParameterDecorator;
export type ComposedDecorator = MethodDecorator & PropertyDecorator & ClassDecorator & ParameterDecorator;
export declare function composeDecorators(...decorators: ComposableDecorator[]): ComposedDecorator;
