# Zombie Protocol 
![](https://i.imgur.com/JJpiT1Y.jpg)
#### *I want your fomo hand*
   　  
-----
#### No Pre-mine, No Founder Fee, No Friends
#### ~~PUBG~~ winner take all!

## The Protocol
Zombie is a social experiment game, you can see the true side of humanity only at the moment of domination. You only need 1 $BTC and 1 $ZOMBIE when the world is going to end. Zombie is designed to see the true face of your friend and if you understand the rules, you can play to the end.

The $ZOMBIE token combines a simplified version of Ampleforth’s economic policy with YFI’s distribution mechanism, finally we added PUBG’s poison circle mechanism! Do you think your companion will save you?

## The world is shrinking

Do you know who is your true friend? Who can help you when fleeing? We no longer need a bunch of tokens that in defi list, we only need BTC + ZOMBIE. Especially when fleeing...


![](https://i.imgur.com/aIeonHV.png)
**~~This time, we will really see a $100 coin~~**


At core, $ZOMBIE is a shrinking-only supply cryptocurrency, which only **contracts** its supply in response to market conditions, initially targeting 100 USD per $ZOMBIE. 

> If the $ZOMBIE price does not reach $100, contracts rebase will be carried out every 24 hours, and after each rebase, **if your account's zombie balace not over then 1 $ZOMBIE, your $ZOMBIE will be permanently burned.**
```
if(_zombieBalances[who].mul(zombieScalingFactor).div(internalDecimals) < 1e18){
    return 0;
}
```

## Community Launch & Token Distribution
The $ZOMBIE token has 4 separate staking pools.

Total supply: 306,780 $ZOMBIE  
Token Distribution Period: 10 Weeks
Token Distribution starts at: 2020/08/24 10:00:00 (UTC+0)
Token Distribution:
* Dai pool: 35% 　　　　　　　　　　　　　- 107,373 $ZOMBIE
* Uniswap Dai-Zombie LP pool: 35% 　　　- 107,373 $ZOMBIE
* Dice pool: 10% 　　　　　　　　　　　　 - 30,678 $ZOMBIE
* Uniswap Eth-Shrimp LP pool: 20%  　　　- 61,356 $ZOMBIE


#### Pool 0 - Dai pool
> yields the initial $ZOMBIE token supply. To join this pool, you need to stake $DAI through the Zombie application.

#### Pool 1 - Uniswap Zombie LP pool
> To join this pool, you must stake  DAIZOMBIE-V2 LP tokens that can be acquired by depositing $ZOMBIE and $DAI into the $ZOMBIE Uniswap pool.
> 
> *This pool will be opened two hours later after Farming is turned on.*

#### Pool 2 - Uniswap Shrimp LP pool
> 🚨🚨 Shrimp Unite!
>  🦐 Shrimp is a community that gathers all investors. We share the latest Pump tokens and collectively discuss the latest DeFi technology!
>  
> To join this pool, you must stake  ETHSHRIMP-V2 LP tokens that can be acquired by depositing $SHRIMP and $ETH into the $SHRIMP Uniswap pool. [Uniswap Link](https://app.uniswap.org/#/add/0x38c4102d11893351ced7ef187fcf43d33eb1abe6/ETH)

#### Pool 3 - Dice pool
> 🎲 DICE.FINANCE Is A Fully Decentralized Protocol For Casino On Ethereum. An unstoppable bankroll drives casino for thousands of users and hundreds of applications.
> 
> To join this pool, you must stake $DICE tokens.

***In order to motivate early players, the first 72 hours of $ZOMBIE reward will be doubled.***

Rebases will not be available until 95% of the total token supply is claimed. This period of time is a minimum of two weeks, but since this requires the community to claim their tokens through the zombie application, it could take up to a maximum of 3 weeks.



## The developer
$ZOMBIE ERC20 Address: [LINK](https://etherscan.io/token/0xd55BD2C12B30075b325Bc35aEf0B46363B3818f8)  
Pool 0 - Allocation transaction：Not yet allocated  
Pool 1 - Allocation transaction：Not yet allocated  
Pool 2 - Allocation transaction：Not yet allocated  
Pool 3 - Allocation transaction：Not yet allocated

There is no mint function in $ZOMBIE ERC20, the total amount of $zombie is fixed, even vitalik can’t change, please don’t ask dev to burn the admin key🙆‍♂️

## Countdown to the end of the world
* Week 1: Tokens Distrubuted(8/24 ~ 8/31)
* Week 2: Tokens Distrubuted(8/31 ~ 9/7)
* Week 3: Tokens Distrubuted(9/7 ~ 9/14)
* Week 4: Tokens Distrubuted(9/14 ~ 9/21)
* Week 5: Tokens Distrubuted + Doomsday clock starts to count(9/21 ~ 9/28)
* Week 6: Tokens Distrubuted(9/28 ~ 10/5)
* Week 7: Tokens Distrubuted(10/5 ~ 10/12)
* Week 8: Tokens Distrubuted(10/12 ~ 10/19)
* Week 9: Tokens Distrubuted(10/19 ~ 10/26)
* Week 10: Tokens Distrubuted(10/26 ~ 11/2)

***Doomsday clock starts to count at: 2020/09/21 10:00:00 (UTC+0)**

## Governance
? There is no government, the world is destroyed...


## Audits

None. Contributors have given their best efforts to ensure the security of these contracts, but make no guarantees. It has been spot checked by just a few pairs of eyes. It is a probability - not just a possibility - that there are bugs. That said, minimal changes were made to the staking/distribution contracts that have seen hundreds of millions flow through them via SNX, YFI, and YFI derivatives. The reserve contract is excessively simple as well. We prioritized staked assets' security first and foremost.


If you feel uncomfortable with these disclosures, don't stake or hold Zombie. If the community votes to fund an audit, or the community is gifted an audit, there is no assumption that the original devs will be around to implement fixes, and is entirely at their discretion.



#### Attributions
Much of this codebase is modified from existing works, including:

[Ampleforth](https://ampleforth.org) - Initial rebasing mechanism, modified to better suit the YAM protocol

[Synthetix](https://synthetix.io) - Rewards staking contract

[YEarn](https://yearn.finance)/[YFI](https://ygov.finance) - Initial fair distribution implementation
