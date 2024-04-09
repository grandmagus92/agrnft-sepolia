import { CONTRACT_ADDRESS } from '../../const/addresses';
import style from '../../styles/Home.module.css'
import { ThirdwebNftMedia, useAddress,useContract,useOwnedNFTs } from '@thirdweb-dev/react'

export default function Profile(){
    const address = useAddress();
    const truncateAddress=(address: string)=>{
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    const {
        contract 
    } =useContract(CONTRACT_ADDRESS);
    const{
        data: ownedNFTs,
        isLoading:isOwnedNTFsLoading,
    }=useOwnedNFTs(contract, address);

    return(
        <div className={style.container}>
            {address? (
                <div>
                    <div>
                        <h1>Profile</h1>
                        <p>Wallet Adress:{truncateAddress(address || "")}</p>
                    </div>
                    <hr />
                    <div>
                        <h3>My NFTs:</h3>
                        <div className={style.grid}>
                            {!isOwnedNTFsLoading?(
                                ownedNFTs?.length ! > 0 ?(
                                    ownedNFTs?.map((nft)=>(
                                        <div key={nft.metadata.id} className={style.NFTCard}>
                                            <ThirdwebNftMedia
                                            metadata={nft.metadata}
                                            />
                                            <h3>{nft.metadata.name}</h3>
                                        </div>
                                    ))
                                ):(
                                    <p>No NFTs owned</p>
                                )    
                            ):(
                                <p>Loading....</p>
                            )}
                        </div>
                    </div>
                </div>
            ):(
                <div className={style.main}>
                    <p>Please connect your wallet</p>
                </div>
            )}
        </div>
    )
};