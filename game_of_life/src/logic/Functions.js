import React from 'react'

class Functions {

    constructor(generation = 0, liveCells = new Map()){
        this.generation = generation;
        this.liveCells = liveCells
        this.nextGeneration = new Map();
        this.deadCells = new Map();
    }

    getGeneration(){
        return this.generation;
    }

    getLiveCells(){
        return this.liveCells;
    }

    addCell(position){
        this.liveCells.set(position.x + " , " + position.y, {
            x: position.x,
            y: position.y
        });
    }

    removeCell(position){
        this.liveCells.delete(position);
    }

    isCellAlive(position){
        return this.liveCells.has(position);
    }

    storeCell(position){
        if(this.isCellAlive(position.x + " , " + position.y)){
            this.removeCell(position.x + " , " + position.y);
        } else {
            this.addCell(position);
        }
        return new Functions(this.generation, this.liveCells);
    }

    addGeneration(){
        this.liveCells.forEach((item) => {
            this.howManyLiveNeighbors(item);
        })

        this.deadCells.forEach((item) => {
            this.howManyDeadNeighbors(item);
        })
        
        this.generation++;

        return new Functions(this.generation, this.nextGeneration);
    }

    howManyLiveNeighbors(position){
        // base case
        var liveNeighbors = 0;

        //check cell neighbors
        for(var i = position.x -1; i <= position.x +1; i++){
            for(var j = position.y -1; j <= position.y + 1; j++){
                //make sure we're not counting our current position
                if(i === position.x && j === position.y)
                    continue;
                //if we have a living neighbor, add it to the count
                if(this.isCellAlive(i + " , " + j)){
                    liveNeighbors++;
                } else {
                    this.deadCells.set(i + " , " + j, {x: i, y: j})
                }
            
            }
        }
        //apply the rule of neighbors
        if(liveNeighbors === 2 || liveNeighbors === 3){
            this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y:position.y});
        }
    }

    howManyDeadNeighbors(position){
        //base case
        var liveNeighbors = 0;

        //check cell neighbors
        for(var i = position.x - 1; i <= position.x + 1; i++){
            for(var j = position.y - 1; j <= position.y + 1; j++){
                if(i === position.x && j === position.y)
                continue;

            if(this.isCellAlive(i + " , " + j)){
                liveNeighbors++
            }
            }
        }
        //apply the rule of dead neighbors
        if(liveNeighbors === 3){
            this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y: position.y});
        }
    }
}



export default Functions;