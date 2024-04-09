
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { MediaRenderer, Web3Button, useActiveClaimConditionForWallet, useAddress, useClaimIneligibilityReasons, useContract, useContractMetadata, useTotalCirculatingSupply, useTotalCount } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";


const Home: NextPage = () => {
  
  const address = useAddress();

  const {
    contract
  }= useContract(CONTRACT_ADDRESS);
  const {
    data: contractMetadata,
    isLoading: isContractMetadataLoading,
  } = useContractMetadata(contract);

  const {
    data:activeClaimPhase,
    isLoading: isActiveClaimphaseLoading,
  } = useActiveClaimConditionForWallet(contract, address);
  const {
    data:totalSupply,
    isLoading: isTotalSupplyLoading,
  } = useTotalCount(contract);
  const{
    data: totalClaimed,
    isLoading: isTotalClaimedLoading,
  } = useTotalCirculatingSupply(contract);

  const maxClaimeble =parseInt(activeClaimPhase?.maxClaimablePerWallet || "0");

  const {
    data: claimIneleigibility,
    isLoading: isCLaimIneleigibilityLoading,
  }= useClaimIneligibilityReasons(
    contract,
    {
      walletAddress:address || "",
      quantity:1,
    }
  )

  return (
    <div className={styles.container}>
      <div className={styles.main}>
      {!isContractMetadataLoading &&(
        <div className={styles.heroSection}>
          <div className={styles.collectionImage}>
          <MediaRenderer
            src={contractMetadata?.image}
          />
          </div>
          <div>
            <h1>{contractMetadata.name}</h1>
            <p>{contractMetadata.description}</p>
            {!isActiveClaimphaseLoading ? (
              <div>
                <p>Claim Phase: {activeClaimPhase?.metadata.name}</p>
                <p>Price : {ethers.utils.formatUnits(activeClaimPhase?.price)} eth</p>
                </div>
          ):(
              <p>Loading.....</p>
            )}
            {!isTotalSupplyLoading && !isTotalClaimedLoading? (
              <p>Claimed : {totalClaimed?.toNumber()}/ {totalSupply?.toNumber()}</p>
            ):(
              <p>Loading...</p>
            )}
            {address ? (
              !isCLaimIneleigibilityLoading ? (
                claimIneleigibility?.length > 0 ? (
                  claimIneleigibility?.map((reason, index) =>(
                    <p key={index}>{reason}</p>
                  ))
                ):(
                  <div>
                    <p>Your are eligible to claim.{`(Max Claimable: ${maxClaimeble})`}</p>
                     <div className={styles.claimContainer}>
                      

                     <Web3Button
                     contractAddress={CONTRACT_ADDRESS}
                     action={(contract)=> contract.erc721.claim(1)}
                    >Claim NFT</Web3Button>  
                     </div>
                  </div>
                )
              ):(
                <p>Loading...</p>
              )
            ):(
              <p className={styles.attention}>Connect your wallet!!</p>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;
