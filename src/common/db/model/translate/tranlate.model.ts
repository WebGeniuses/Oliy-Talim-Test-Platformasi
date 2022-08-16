import { prop } from "@typegoose/typegoose";

export class Translation {
    @prop({
        required: true,
        trim: true
    })
    default!: string;

    @prop({
        trim: true
    })
    uz?: string;

    @prop({
        trim: true
    })
    ru?: string;

    @prop({
        trim: true
    })
    en?: string;
}