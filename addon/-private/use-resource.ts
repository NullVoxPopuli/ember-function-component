// // https://github.com/josemarluedke/glimmer-apollo/blob/main/packages/glimmer-apollo/addon/-private/use-resource.ts
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import { getValue } from '@glimmer/tracking/primitives/cache';
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import { invokeHelper } from '@ember/helper';

// import type { Resource } from './resource';
// import type { Cache, TemplateArgs } from './types';

// type Args = TemplateArgs | TemplateArgs['positional'] | TemplateArgs['named'];

// function normalizeArgs(args: Args): TemplateArgs {
//   if (Array.isArray(args)) {
//     return { positional: args, named: {} };
//   }

//   if ('positional' in args || 'named' in args) {
//     return {
//       positional: (args.positional as TemplateArgs['positional']) || [],
//       named: (args.named as TemplateArgs['named']) || {},
//     };
//   }

//   if (typeof args === 'object') {
//     return { named: args as TemplateArgs['named'], positional: [] };
//   }

//   return args;
// }

// export function useUnproxiedResource<
//   TArgs = Args,
//   T extends Resource<TemplateArgs> = Resource<TemplateArgs>
// >(destroyable: object, definition: object, args?: () => TArgs): { value: T } {
//   let resource: Cache<T>;

//   return {
//     get value(): T {
//       if (!resource) {
//         resource = invokeHelper(
//           destroyable,
//           definition, // eslint-disable-line
//           () => {
//             return normalizeArgs(args?.() || {});
//           }
//         ) as Cache<T>;
//       }

//       return getValue<T>(resource)!; // eslint-disable-line
//     },
//   };
// }

