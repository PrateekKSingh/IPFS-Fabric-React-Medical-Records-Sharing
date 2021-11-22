import * as IPFS from 'ipfs-core'

let ipfs_core
async function ipfsCore() {
    return await IPFS.create({repo: 'ok' + Math.random()});
}

async function CreateKey(obj) {
    if(ipfs_core){
        console.log('ipfs_core', ipfs_core)
        return await ipfs_core.dag.put(obj)
    } else{
        ipfs_core = await ipfsCore();
        // localStorage.setItem('ipfs_core', ipfs_core)
        return await ipfs_core.dag.put(obj)
    }
}

export async function getInstanceIPFS () {
    // ipfs_core = localStorage.getItem('ipfs_core')
    if(!ipfs_core) {
        ipfs_core = await ipfsCore()
    }
    return ipfs_core
}



export default CreateKey;