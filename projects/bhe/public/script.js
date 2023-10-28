const elements = {
    save: document.getElementById("save"),
    input: document.getElementById("input"),
    postField: document.getElementById("postField"),
    timeStamp: document.getElementById('ts'),
}

const updateTS = setInterval(() => {
    elements.timeStamp.innerHTML=Date.now()
})  

const testAll = [];
const dispAll = ( arr) => {
    postField.innerHTML = '';
    for(const element of arr.toReversed()){
        element.disp

    }
}

class Post {
    constructor(contents) {
        this.contents = contents,
            this.id = window.crypto.randomUUID(),
            this.score = 1,
            this.publish = Date.now(),
            this.asscDisp
    }


    initDisp() {
        const wrap = document.createElement("div")
        wrap.id = this.id;
        wrap.className = "post";

        const id = document.createElement("span");
        id.append(document.createTextNode(this.id))

        const date = document.createElement("span");
        date.append(document.createTextNode(this.publish));

        const contents = document.createElement("p");
        contents.append(document.createTextNode(this.contents));

        // to do - will implement deletion
        const votes = document.createElement("p");
        const up = document.createElement("button");
        up.append(document.createTextNode(" ^ "));
        up.id = "up-" + this.id;

        const total = document.createElement("span");
        total.id = "total-" + this.id;
        total.append(document.createTextNode(this.score))

        const down = document.createElement("button");
        down.append(document.createTextNode(" v "));
        down.id = "down-" + this.id;
        votes.append(up, total, down);

        wrap.append(id, date, contents, votes);
        this.asscDisp= wrap;
        document.querySelector("body").append(wrap);
    }
}



elements.save.onmousedown = () => {
    const post = new Post(elements.input.value);
    testAll.push(post);
    post.initDisp();
    elements.input.value = '';
}
