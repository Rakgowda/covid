 export const NumbFormate=(d)=>{
    return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }