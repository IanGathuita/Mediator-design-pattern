/* A.K.A controller - used to reduce the communication complexity between multiple objects.
Provides a mediator object and that mediator object normally handles all the communication complexities
between different objects.*/

/*If we had 4 objects that communicate with each other, each obj would have a reference to each other so
that an obj can invoke other objects' methods. This is tight coupling. Mediator solves this*/

interface WhatsAppGroupMediator{
    sendMessage(message:string, user: User):void;
    addUser(user:User):void
}

class ConcreteWhatsAppGroupMediator implements WhatsAppGroupMediator{

    members:User[] = [];

    sendMessage(message: string, user: User): void {
        for(let member of this.members){
            if(member != user){
                member.receive(message);
            }
        }
    }
    addUser(user: User): void {
        this.members.push(user);
    }

}

//colleague
abstract class User{
    mediator: WhatsAppGroupMediator;
    name:string

    constructor(mediator:WhatsAppGroupMediator, name:string){
        this.mediator = mediator;
        this.name = name;
    }

    abstract send(message:string):void;

    abstract receive(message:string):void;
}

class ConcreteUser extends User{

    constructor(mediator:WhatsAppGroupMediator, name:string){
        super(mediator,name);
    }

    send(message: string) {
        console.log(`${this.name} sending the message ' ${message} '.`);
        this.mediator.sendMessage(message,this);
    }

    receive(message: string) {
        console.log(`${this.name} received message ' ${message} '.`);
    }

}

//client
let groupMediator = new ConcreteWhatsAppGroupMediator();
let ian:User  = new ConcreteUser(groupMediator,'Ian');
let mom:User  = new ConcreteUser(groupMediator,'Mom');
let jaq:User  = new ConcreteUser(groupMediator,'Jaq');
let ben:User  = new ConcreteUser(groupMediator,'Ben');
let jul:User  = new ConcreteUser(groupMediator,'Jul');

groupMediator.addUser(ian);
groupMediator.addUser(mom);
groupMediator.addUser(jaq);
groupMediator.addUser(ben);
groupMediator.addUser(jul);

ian.send('Ssup y\'all');
jul.send('We\'re good, you?');