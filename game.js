import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
    constructor() {
        this.hp = 100;
        this.atk = 10;
        this.maxdmgval = 0.2;
        this.spatkop = 0;
        this.defop = 0;
        this.runop = 74;
        this.heal = 0;
    }

    maxdmg() {
        return Math.round((this.atk * this.maxdmgval) + this.atk);
    }

    attack() {
        // 플레이어의 공격력 범위 내에서 Math.random()을 이용해 나온 값으로 Monster의 hp를 감소시킨다
        // 여기서 monster 속성에 직접 적용? 복잡할듯?
        // 일단은 데미지만 계산해야겟다
        let dmg = Math.round(Math.random() * (this.atk * this.maxdmgval) + this.atk);
        //console.log(dmg);
        return dmg;
    }

    spdefran() {
        // 매턴 시작마다 특수공격, 방어 확률을 난수돌림
        this.spatkop = Math.round(Math.random() * 66) + 11;
        this.defop = Math.round(Math.random() * 77) + 11;
    }

    spatk() {
        // 기본 확률보다 이하의 값이 나오면 성공, 초과는 실패
        let a = Math.round(Math.random() * 100);
        if (a <= this.spatkop) {
            //성공
            return true;
        } else {
            //실패
            return false;
        }
    }

    def() {
        // 기본 확률보다 이하의 값이 나오면 성공, 초과는 실패
        let a = Math.round(Math.random() * 100);
        if (a <= this.defop) {
            //성공
            return true;
        } else {
            //실패
            return false;
        }
    }

    run() {
        // 확률에서 이하의 값이 나오면 도망성공, 초과로는 실패
        // 도망 성공 시 도망확률이 기존값 밑으로 랜덤 하락, 최소 10퍼만 유지
        let a = Math.round(Math.random() * 100);
        if (a <= this.runop) {
            this.runop = Math.round(Math.random() *Math.round(this.runop/2) + Math.round(this.runop/2) );
            if (this.runop <= 10) this.runop = 10;
            return true;
        } else {
            return false;
        }
    }

    hpheal() {
        this.heal = Math.round(Math.random() * 67 + 44)
        this.hp += this.heal;
        console.log(chalk.green(`HP +${this.heal}`));
    }

    s_heal() {
        this.heal = Math.round(Math.random() * 18 + 15)
        this.hp += this.heal;
        // console.log(chalk.green(`HP +${heal}`));
    }

    powerup() {
        //랜덤으로 공격력or 최대 공격배율 증가
        let tmpatk;
        let tmpmaxdmgval;
        switch (Math.round(Math.random() * 2 + 1)) {
            case 1:
                tmpatk = Math.round(Math.random() * 5) + 4;
                this.atk += tmpatk;
                console.log(chalk.green(`공격력 +${tmpatk}`));
                console.log(chalk.green(`최대 공격력 ${this.maxdmg()}`));
                break;
            case 2:
                tmpmaxdmgval = (Math.round(Math.random() * 60) + 20) / 100;
                this.maxdmgval += tmpmaxdmgval;
                console.log(chalk.green(`공격력 배율 +${tmpmaxdmgval}`));
                console.log(chalk.green(`최대 공격력 ${this.maxdmg()}`));
                break;
            case 3:
                tmpatk = Math.round(Math.random() * 3) + 2;
                this.atk += tmpatk;
                tmpmaxdmgval = (Math.round(Math.random() * 30) + 10) / 100;
                this.maxdmgval += tmpmaxdmgval;
                console.log(chalk.green(`공격력 +${tmpatk}`));
                console.log(chalk.green(`공격력 배율 +${tmpmaxdmgval}`));
                console.log(chalk.green(`최대 공격력 ${this.maxdmg()}`));
                break;

        }
    }

    hpheal_run() {
        this.heal = Math.round(Math.random() * 40 + 22);
        this.hp += this.heal;
        console.log(chalk.green(`HP +${this.heal}`));
    }

    powerup_run() {
        let tmpatk;
        let tmpmaxdmgval;
        switch (Math.round(Math.random() * 2 + 1)) {
            case 1:
                tmpatk = Math.round(Math.random() * 2) + 2;
                this.atk += tmpatk;
                console.log(chalk.green(`공격력 +${tmpatk}`));
                console.log(chalk.green(`최대 공격력 ${this.maxdmg()}`));
                break;
            case 2:
                tmpmaxdmgval = (Math.round(Math.random() * 23) + 10) / 100;
                this.maxdmgval += tmpmaxdmgval;
                console.log(chalk.green(`공격력 배율 +${tmpmaxdmgval}`));
                console.log(chalk.green(`최대 공격력 ${this.maxdmg()}`));
                break;
            case 3:
                tmpatk = Math.round(Math.random() * 1) + 1;
                this.atk += tmpatk;
                tmpmaxdmgval = (Math.round(Math.random() * 11) + 5) / 100;
                this.maxdmgval += tmpmaxdmgval;
                console.log(chalk.green(`공격력 +${tmpatk}`));
                console.log(chalk.green(`공격력 배율 +${tmpmaxdmgval}`));
                console.log(chalk.green(`최대 공격력 ${this.maxdmg()}`));
                break;

        }
    }
}

class Monster {
    constructor(stage) {
        this.hp = 20
        this.atk = 3
        this.maxdmgval = 0.2
        if (stage <= 5) {
            for (let i = 0; i < stage; i++) {
                this.hp += Math.round(Math.random() * 13 + 20);
                this.atk += Math.round(Math.random() * 1 + 2);
                this.maxdmgval += Math.round(Math.random() * 2 + 3) / 100;
            }
        } else if (stage <= 8) {
            for (let i = 0; i < stage; i++) {
                this.hp += Math.round(Math.random() * 17 + 24);
                this.atk += Math.round(Math.random() * 2 + 2);
                this.maxdmgval += Math.round(Math.random() * 3 + 3) / 100;
            }
        }
        else {
            for (let i = 0; i < stage; i++) {
                this.hp += Math.round(Math.random() * 22 + 33);
                this.atk += Math.round(Math.random() * 2 + 3);
                this.maxdmgval += Math.round(Math.random() * 3 + 4) / 100;
            }
        }
    }
    // 이것도 증가치 랜덤으로 변경해야함 지금은 고정치
    // if (stage <= 5) {
    // this.hp = 40 + (stage-1)*Math.round(Math.random()*5+18);
    // this.atk = 5 + (stage-1)*Math.round(Math.random()*1+1);
    // this.maxdmgval = 0.4 + (stage-1)*Math.round(Math.random()*3+5)/100;
    // } else {
    //     // this.hp = 50 + (stage - 1) * 26;
    //     this.hp = 50 + (stage - 1) * Math.round(Math.random() * 10 + 25);
    //     // this.atk = 4 + (stage - 1) * 2;
    //     this.atk = 5 + (stage - 1) * Math.round(Math.random() * 1 + 2);
    //     // this.maxdmgval = 0.5 + (stage - 1) * 0.08;
    //     this.maxdmgval = 0.5 + (stage - 1) * Math.round(Math.random() * 4 + 6) / 100;
    // }


    maxdmg() {
        return Math.round((this.atk * this.maxdmgval) + this.atk);
    }

    attack() {
        // 몬스터의 공격력 범위 내에서 Math.random()을 이용해 나온 값으로 Player의 hp를 감소시킨다
        let dmg = Math.round(Math.random() * (this.atk * this.maxdmgval) + this.atk);
        return dmg;
    }
}

function delay(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 500));
}

function displayStatus(stage, player, monster) {
    console.log(chalk.magentaBright(`\n=== Current Status ===`));
    console.log(
        chalk.cyanBright(`| Stage: ${stage} `) +
        chalk.blueBright(
            `| Player HP: ${player.hp}, Attack: ${player.atk} ~ ${player.maxdmg()} `,
        ) +
        chalk.redBright(
            `| Monster HP: ${monster.hp}, Attack: ${monster.atk} ~ ${monster.maxdmg()} |`,
        ),
    );
    console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
    let logs = [];
    let runtf = false;

    player.runop -= 4;
    if (player.runop <= 10) player.runop = 10;

    function log_refill() {
        console.clear()
        displayStatus(stage, player, monster);
        logs.forEach((log) => console.log(log));
    }

    function p_atk_mon() {
        let dmg = player.attack();
        monster.hp = monster.hp - dmg;
        if (monster.hp <= 0) monster.hp = 0;
        logs.push(chalk.green(`몬스터에게 ${dmg}의 피해를 입혔습니다.`));
        log_refill();
    }

    function mon_atk_p() {
        let dmg = monster.attack();
        player.hp = player.hp - dmg;
        if (player.hp <= 0) player.hp = 0;
        logs.push(chalk.red(`몬스터가 ${dmg}의 피해를 입혔습니다.`));
        log_refill();
    }

    while (player.hp > 0) {
        // console.clear();
        // displayStatus(stage, player, monster);

        // logs.forEach((log) => console.log(log));
        log_refill();
        player.spdefran();

        console.log(
            chalk.green(
                `\n1. 공격 2. 연속공격(${player.spatkop}%) 3. 방어(${player.defop}%) 4. 도망(${player.runop}%)`,
            ),
        );
        const choice = readlineSync.question('당신의 선택은? ');

        // 플레이어의 선택에 따라 다음 행동 처리
        //logs.push(chalk.green(`${choice}를 선택하셨습니다.`));


        switch (choice) {
            case '1':
                p_atk_mon();
                await delay(1);
                if (monster.hp >= 1) {
                    mon_atk_p();
                    await delay(1);
                }
                break;
            case '2':
                //연속공격
                if (player.spatk() === true) {
                    //성공시 공격2번 계산
                    logs.push(chalk.green(`연속 공격!`));
                    log_refill();
                    await delay(1);

                    p_atk_mon();
                    await delay(1);

                    p_atk_mon();
                    await delay(1);
                } else {
                    logs.push(chalk.green(`연속 공격 실패!`));
                    log_refill();
                    await delay(1);
                }

                if (monster.hp >= 1) {
                    mon_atk_p();
                    await delay(1);
                }
                break;
            case '3':
                // 방어
                if (player.def() === true) {
                    //성공시 피해없음 + hp 소량 회복
                    logs.push(chalk.green(`방어에 성공했다! 소량의 체력 회복!`));
                    log_refill();
                    await delay(1);
                    player.s_heal(); //소랑 회복
                    logs.push(chalk.green(`HP +${player.heal}`));
                    log_refill();
                    await delay(1);


                } else {
                    logs.push(chalk.green(`방어에 실패했다!`));
                    log_refill();
                    await delay(1);

                    mon_atk_p();
                    await delay(1);
                }
                break;
            case '4':
                // 빤스런            console.clear();
                logs.push(chalk.green(`도망가기를 시전했다!`));
                log_refill();
                await delay(1);
                if (player.run() === true) {
                    runtf = true; // 다음 스테이지로 넘어가기 위한 변수
                } else {
                    logs.push(chalk.green(`도망에 실패했다!`));
                    log_refill();
                    await delay(1);

                    mon_atk_p();
                    await delay(1);
                }
                break;
            default:
                logs.push(chalk.green(`제대로 된 값을 입력해주시기 바랍니다.`));
        }

        if (monster.hp <= 0) {
            log_refill();
            console.log(chalk.green(`몬스터를 쓰러트렸습니다.`));
            await delay(1);

            if (stage < 10) {
                console.log(chalk.green(`보상을 획득합니다.`));
                await delay(1);
                player.hpheal();
                await delay(1);
                player.powerup();
                await delay(4);
                break;
            } else {
                await delay(2);
                console.log(chalk.blue("탐험을 완료했습니다!"));
                break;
            }
        }

        if (runtf === true) {
            log_refill();
            console.log(chalk.green(`도망에 성공했다!`));
            await delay(1);
            if (stage >= 10) {
                console.log(chalk.blue("탐험을 완료했습니다!"));
                await delay(2);
                break;
            } else {
                console.log(chalk.green(`보상을 일부 획득합니다.`));
                await delay(1);
                player.hpheal_run();
                await delay(1);
                player.powerup_run();
                await delay(4);
            }
            break;
        }
    }
};

export async function startGame() {
    console.clear();
    const player = new Player();
    let stage = 1;

    while (stage <= 10) {
        const monster = new Monster(stage);
        await battle(stage, player, monster);
        // 스테이지 클리어 및 게임 종료 조건

        if (player.hp <= 0) {
            console.log(chalk.red("당신은 죽었습니다."));
            delay(1);
            console.log(chalk.red("Game Over"));
            break;
        }

        stage++;
    }

}