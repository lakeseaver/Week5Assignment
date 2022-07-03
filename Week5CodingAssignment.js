//  Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements.
//  a.	Use at least one array.
//  b.	Use at least two classes.
//  c.	Your menu should have the options to create, view, and delete elements.

class Character {
    constructor(name, dndClass, level){
        this.name = name;
        this.dndClass = dndClass;
        this.level = level;
    }

    describe(){
        return `${this.name} is a ${this.level} level ${dndClass}.`;
    }
}

class PartyMembers {
    constructor(groupName){
        this.groupName = groupName;
        this.partyMembers = [];
    }

    addPartyMember(partyMember){
        if (partyMember instanceof Character){
          this.partyMembers.push(partyMember);  
        }else{
            throw new Error(`You can only add a Character to the Party. Argument is not a Character: ${partyMemeber}.`);
        }
    }

    describe(){
        return `The group known as ${this.groupName} have ${this.partyMembers.length} characters in their party.`;
    }
}

class Menu {
    constructor(){
        this.parties = [];
        this.selectedParty = null;
    }

    start(){
        let selection = this.showMainMenuOptions();

        while(selection != 0){
            switch (selection){
                case "1":
                    this.createParty();
                    break;
                case "2":
                    this.viewParty();
                    break;
                case "3":
                    this.deleteParty();
                    break;
                case "4":
                    this.displayParties();
                    break;
                default:
                    selection = 0;                
            }
            selection = this.showMainMenuOptions();
        }

        alert("Goodbye!");
    }

    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) create new party
        2) view party
        3) delete party
        4) display all parties
        `);
    }

    showPartyMenuOptions(partyInfo){
        return prompt(`
        0) back
        1) create a character
        2) delete a character 
        ---------------------
        ${partyInfo}
        `);
    }

    displayParties(){
        let partyString = "";
        for(let i = 0; i < this.parties.length; i++){
            partyString += i + ") " + this.parties[i].groupName + "\n";
        }
        alert(partyString);
    }
    createParty(){
        let groupName = prompt("Enter your DND adventuring Party's name:");
        this.parties.push(new PartyMembers(groupName));
    }

    viewParty(){
        let index = prompt("Enter the index of the Party you wish to view:");
        if(index > -1 && index < this.parties.length){
            this.selectedParty = this.parties[index];
            let description = "Party Name: " + this.selectedParty.groupName + "\n";
            
            for(let i = 0; i < this.selectedParty.partyMembers.length; i++){
                description += i + ") Name: " + this.selectedParty.partyMembers[i].name + " , Class: " + this.selectedParty.partyMembers[i].dndClass 
                    + " , Level: " + this.selectedParty.partyMembers[i].level + "\n";
            }

            let selection = this.showPartyMenuOptions(description);
            switch(selection){
                case "1":
                    this.createCharacter();
                    break;
                case "2":
                    this.deleteCharacter();
            }
        }
    }

    deleteParty(){
        let index = prompt("Enter the index of the Party you wish to delete:");
        if(index > -1 && index < this.parties.length){
            this.parties.splice(index,1);
        }
    }

    createCharacter(){
        let name = prompt("Enter the name of your new DND character:");
        let dndClass = prompt("Enter your new character's DND class:");
        let level = prompt("Enter the current level of your new DND character:");
        this.selectedParty.partyMembers.push(new Character(name, dndClass, level));
    }

    deleteCharacter(){
        let index = prompt("Enter the index of the character you wish to delete:");
        if(index > -1 && index < this.selectedParty.partyMembers.length){
            this.selectedParty.partyMembers.splice(index,1);
        }
    }
}

let menu = new Menu();
menu.start();