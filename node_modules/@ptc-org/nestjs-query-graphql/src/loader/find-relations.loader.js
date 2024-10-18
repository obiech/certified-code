"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindRelationsLoader = void 0;
class FindRelationsLoader {
    constructor(RelationDTO, relationName) {
        this.RelationDTO = RelationDTO;
        this.relationName = relationName;
    }
    createLoader(service, opts) {
        return async (args) => {
            const grouped = this.groupFinds(args, opts);
            return this.loadResults(service, grouped);
        };
    }
    async loadResults(service, findRelationsMap) {
        const results = [];
        await Promise.all([...findRelationsMap.values()].map(async (args) => {
            const { filter, withDeleted, lookedAhead } = args[0];
            const dtos = args.map((a) => a.dto);
            const opts = { filter, withDeleted, lookedAhead };
            const relationResults = await service.findRelation(this.RelationDTO, this.relationName, dtos, opts);
            const dtoRelations = dtos.map((dto) => relationResults.get(dto));
            dtoRelations.forEach((relation, index) => {
                results[args[index].index] = relation;
            });
        }));
        return results;
    }
    groupFinds(queryArgs, opts) {
        // group
        return queryArgs.reduce((map, args, index) => {
            const filterJson = JSON.stringify(args.filter);
            if (!map.has(filterJson)) {
                map.set(filterJson, []);
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            map.get(filterJson).push({ ...args, ...opts, index });
            return map;
        }, new Map());
    }
}
exports.FindRelationsLoader = FindRelationsLoader;
//# sourceMappingURL=find-relations.loader.js.map