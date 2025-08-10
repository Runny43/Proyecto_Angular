export class Servicios {
    id!: number;
    service_names!: string;
    service_description!: string;
    duration!: string;
    price!: number;

    constructor(
        id: number,
        service_names: string,
        service_description: string,
        duration: string,
        price: number
    ) {
        this.id = id;
        this.service_names = service_names;
        this.service_description = service_description;
        this.duration = duration;
        this.price = price;
    }
}