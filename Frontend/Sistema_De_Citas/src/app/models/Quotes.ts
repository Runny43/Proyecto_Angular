export class Quotes {
    id!: number;
    title!: string;
    quote_description!: string;
    quote_date!: Date;
    quote_state!: string;
    usersId!: number;
    serviciosId!: number;

    constructor(
        id: number,
        title: string,
        quote_description: string,
        quote_date: Date,
        quote_state: string,
        usersId: number,
        serviciosId: number
    ) {
        this.id = id;
        this.title = title;
        this.quote_description = quote_description;
        this.quote_date = quote_date;
        this.quote_state = quote_state;
        this.usersId = usersId;
        this.serviciosId = serviciosId;
    }
}