import {ZodTypeAny} from "zod";

interface ChecksType {
    min: number,
    max: number
}
function digForChecksInDef(def: any) {

    switch (def.typeName) {
        case 'ZodEffects':
            return digForChecksInDef((def as any).schema._def)
        case 'ZodOptional':
            return digForChecksInDef(def.innerType._def);
        case 'ZodNumber':
            return def.checks;
        default:
            throw new Error('Could not find checks in schema def')
    }
}

export function getChecksFromZodSchema(shape: ZodTypeAny): ChecksType {
    const checks = digForChecksInDef(shape._def);
    return checks.reduce((c: any, v: any) => {
        c[v.kind] = v.value
        return c;
    }, {});
}
