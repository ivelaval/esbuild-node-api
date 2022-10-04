import { prop, getModelForClass } from "@typegoose/typegoose";

class User {

    @prop({
        required: true,
        trim: true,
    })
    firstname: string = "";

    @prop()
    lastname: string = ""

    @prop()
    birthdate: string = ""

    @prop({
        required: true,
        trim: true,
    })
    email: string = ""

    @prop({
        required: true,
        minlength: 6,
    })
    password: string = ""

    @prop()
    createAt: string = ""

    @prop()
    updatedAt: string = ""

}

export default getModelForClass(User);
