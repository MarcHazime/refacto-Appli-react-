
export  interface Iwilder {
    id: number,
    name: string,
    city : string | null,
    bio : string | null,
    skills: IskillOfWilder[]
}

export  interface IskillOfWilder {
    id: number,
    name: string,
    votes: number
}

export  interface IWilderInput {
    name: string,
}





