window.onload = PageLoaded;

function PageLoaded()
{
    //starting buttons
    var vampButton = document.getElementById("vampButton");
    var wolfButton = document.getElementById("wolfButton");
    var huntButton = document.getElementById("huntButton");

    //get the class for the buttons above
    var gameButtons = document.getElementsByClassName("gameButton");

    //get the images area element
    var diceImages = document.getElementById("diceImages");

    var gameMode = 0; //0 is initial state; 1 = vampire; 2 = werewolf; 3 = hunter;
    var traitString = " ";

    //starting button event listeners
    vampButton.onclick = VampGame;
    wolfButton.onclick = WolfGame;
    huntButton.onclick = HuntGame;

//html elements to manipulate

    //basic elements
    var title = document.getElementById("title");
    var header = document.getElementById("header");
    var welcomeMsg = document.getElementById("welcome");
    var diceBox = document.getElementById("diceBox");
    var diceArea = document.getElementById("diceArea");
    var instruction = document.getElementById("instruction");

    var dicePoolDnBtn = document.getElementById("dicePoolDown");
    var dicePoolUpBtn = document.getElementById("dicePoolUp");

    var specialTraitUpBtn = document.getElementById("specialTraitUp");
    var specialTraitDnBtn = document.getElementById("specialTraitDown");

    var difficultyDnBtn = document.getElementById("difficultyDown");
    var difficultyUpBtn = document.getElementById("difficultyUp");

    //label elements
    var diceLabels = [document.getElementById("diceLabel1"),
                      document.getElementById("diceLabel2"),
                      document.getElementById("diceLabel3"),
                      document.getElementById("rollDice"),
                      document.getElementById("makeCheck")];
    console.log(diceLabels[1]);
    var desperationElement = document.getElementById("diceItem4");
    var result = document.getElementById("result");
             
    //event listeners for up and down buttons
    dicePoolUpBtn.onclick = DicePoolUpBtn;
    dicePoolDnBtn.onclick = DicePoolDnBtn;

    specialTraitUpBtn.onclick = SpecialTraitUpBtn;
    specialTraitDnBtn.onclick = SpecialTraitDnBtn;

    difficultyUpBtn.onclick = DifficultyUpBtn;
    difficultyDnBtn.onclick = DifficultyDnBtn;

    //roll dice button and event listener
    var rollDiceButton = document.getElementById("rollDice");
    rollDiceButton.onclick = RollDice;

    //make check button and event listener
    var makeCheckButton = document.getElementById("makeCheck");
    makeCheckButton.onclick = MakeCheck;

    //die object: represents one ten-sided die
    var die = {score:0, isSpecial:false};


//Game Select Buttons    
    //function to start Vampire die roller
    function VampGame()
    {
        gameMode = parseInt(vampButton.value);
        console.log(gameMode);
        document.body.style.backgroundColor = "white";
        title.style.color = "white";
        header.style.backgroundColor = "black";
        diceBox.style.borderColor = "#75031A";
        result.innerHTML = " ";
        diceLabels[1].innerHTML = "<p>Hunger:</p>";
        diceLabels[1].style.fontSize = "1.5em";
        desperationElement.style.display = "none";
        ShowDice();
    }

    //function to start Werewolf die roller
    function WolfGame()
    {
        gameMode = parseInt(wolfButton.value);
        console.log(gameMode);
        document.body.style.backgroundColor = "white";
        header.style.backgroundColor = "#4A6D41";
        diceBox.style.borderColor = "#4A6D41";
        title.style.color = "white";
        result.innerHTML = " ";
        diceLabels[1].innerHTML = "<p>Rage:</p>";
        diceLabels[1].style.fontSize = "1.5em";
        desperationElement.style.display = "none";
        ShowDice();
    }

    //function to start Hunter die roller
    function HuntGame()
    {
        gameMode = parseInt(huntButton.value);
        console.log(gameMode);
        document.body.style.backgroundColor = "white";
        header.style.backgroundColor = "black";
        diceBox.style.borderColor = "#F58220";
        title.style.color = "#F58220";
        result.innerHTML = " ";
        diceLabels[1].innerHTML = "<p>Desperation:</p>";
        diceLabels[1].style.fontSize = "1.25em";
        desperationElement.style.display = "block";
        ShowDice();
    }

//Arrow Buttons for each Input
    function DicePoolUpBtn()
    {
        var dicePoolString = document.getElementById("dicePool");
        var curDicePool = parseInt(dicePoolString.value);

        if(isNaN(curDicePool))
        {
            dicePoolString.value = 1;
        }
        else
        {
            curDicePool += 1;
            dicePoolString.value = curDicePool;
        }
    }

    function DicePoolDnBtn()
    {
        var dicePoolString = document.getElementById("dicePool");
        var curDicePool = parseInt(dicePoolString.value);

        if(isNaN(curDicePool))
        {
            dicePoolString.value = 1;
        }
        else if(curDicePool > 1)
        {
            curDicePool -= 1;
            dicePoolString.value = curDicePool;
        }
    }

    function SpecialTraitUpBtn()
    {
        var speicalTraitString = document.getElementById("specialTrait");
        var curSpecialTrait = parseInt(speicalTraitString.value);

        if(isNaN(curSpecialTrait))
        {
            speicalTraitString.value = 1;
        }
        else if(curSpecialTrait < 5)
        {
            curSpecialTrait += 1;
            speicalTraitString.value = curSpecialTrait;
        }
    }

    function SpecialTraitDnBtn()
    {
        console.log("Button Hit");

        var speicalTraitString = document.getElementById("specialTrait");
        var curSpecialTrait = parseInt(speicalTraitString.value);

        if(isNaN(curSpecialTrait))
        {
            speicalTraitString.value = 1;
        }
        else if(curSpecialTrait >= 1)
        {
            curSpecialTrait -= 1;
            speicalTraitString.value = curSpecialTrait;
        }
    }

    function DifficultyUpBtn()
    {
        var difficultyString = document.getElementById("difficulty");
        var curDifficulty = parseInt(difficultyString.value);

        if(isNaN(curDifficulty))
        {
            difficultyString.value = 1;
        }
        else
        {
            curDifficulty += 1;
            difficultyString.value = curDifficulty;
        }
    }

    function DifficultyDnBtn()
    {
        var difficultyString = document.getElementById("difficulty");
        var curDifficulty = parseInt(difficultyString.value);

        if(isNaN(curDifficulty))
        {
            difficultyString.value = 1;
        }
        else if(curDifficulty >= 1)
        {
            curDifficulty -= 1;
            difficultyString.value = curDifficulty;
        }
    }

    //toggle the dice area, the main body of the page
    function ShowDice()
    {
        for(i = 0; i < gameButtons.length; i ++)
        {
            gameButtons[i].style.backgroundColor = "black";
            gameButtons[i].style.color = "white";
        }
       
        if(gameMode == 1)
        {
            traitString ="Hunger";
            for(x = 0; x < diceLabels.length; x ++)
            {
                diceLabels[x].style.backgroundColor = "#75031A";
                diceLabels[x].style.color = "white";
            } 
        }
        else if(gameMode == 2)
        {
            traitString = "Rage";
            for(x = 0; x < diceLabels.length; x ++)
            {
                diceLabels[x].style.backgroundColor = "#4A6D41";
                diceLabels[x].style.color = "white";
            }
            
        }
        else //if gamemode == 3
        {
            traitString = "Desperation";
            for(x = 0; x < diceLabels.length; x ++)
            {
                diceLabels[x].style.backgroundColor = "#F58220";
                diceLabels[x].style.color = "black";
            }
        }
        welcomeMsg.style.display = "none";
        instruction.innerHTML = "Enter in the number of dice in your dice pool, the " 
        + traitString + " level of your character, and the Difficulty of the roll in the fields below. Use a Difficulty of 0 for Contested Rolls." ;
        diceImages.innerHTML = " ";
        diceBox.style.display = "block";
    }

    //roll the dice
    function RollDice()
    {
    //variables for calculating successes and criticals

        //general (for all games)
        var successes = 0;
        var criticals = 0;

        //vampire specific variables
        var messyCrit = false;
        var bestialFailure = false;

        //werewolf specific variables
        var brutalCount = 0;
        var brutalOutcome = false;
        var brutalFail = false;

        //huter specific variables
        var desperationCount = 0;

        diceImages.innerHTML = " ";
        result.innerHTML = " ";

    //form values and variables derived from them

        //get number of dice
        var dicePoolString = document.getElementById("dicePool");
        dicePoolString.style.backgroundColor = "white";
        var dicePool = parseInt(dicePoolString.value);

        //check if dicePool is a number
        if(isNaN(dicePool))
        {
            dicePoolString.style.backgroundColor = "red";
            instruction.innerHTML = "Please enter a number into the Dice Pool section.";
            return;
        }

        //check if there is at least 1 die in dicePool
        if(dicePool <= 0)
        {
            dicePoolString.style.backgroundColor = "red";
            instruction.innerHTML = "Number too small. Please enter a number above zero into the Dice Pool Section.";
            return;
        }
        console.log(dicePool);  
        
        //get special trait value
        var traitValueString = document.getElementById("specialTrait");
        traitValueString.style.backgroundColor = "white";
        var traitValue = parseInt(traitValueString.value);

        //check if traitValue is a number
        if(isNaN(traitValue))
        {
            traitValueString.style.backgroundColor = "red";
            instruction.innerHTML = "Please enter a number into the " + traitString + " section.";
            return;
        }

        //check if traitValue is not negative or if it is greater than 5
        if(traitValue < 0 || traitValue >= 6)
        {
            traitValueString.style.backgroundColor = "red";
            instruction.innerHTML = "Invalid number. Please enter a number between 0 or 5 into the " + traitString + " section.";
            //console.log("Invalid Input: Number Too Small");
            return;
        }

        //get difficulty value
        var diffValueString = document.getElementById("difficulty");
        diffValueString.style.backgroundColor = "white";
        var diffValue = parseInt(diffValueString.value);

        //check if diffValue is a number
        if(isNaN(diffValue))
        {
            diffValueString.style.backgroundColor = "red";
            instruction.innerHTML = "Please enter a number into the Difficulty section.";
            return;
        }

        //check if there is at least 1 die in diffValue
        if(diffValue < 0)
        {
            diffValueString.style.backgroundColor = "red";
            instruction.innerHTML = "Number too small. Please enter a number above zero into the Difficulty section.";
            return;
        }

        //check if desperation checkbox is true (relevant for hunter only)
        var desperationBox = document.getElementById("desperation");
        var desperation = desperationBox.checked;

        //if desperation is true, add traitValue to the dicePool variable (relevant for hunter only)
        if(gameMode == 3 && desperation == true)
        {
            dicePool += traitValue;
        }

        //roll each die
        for(var i = 0; i < dicePool; i++)
        {
            number = Math.floor(Math.random() * 10) + 1;
            die.score = parseInt(number);

            //if desperation is false, the trait value becomes irrelevant (hunter only)
            if (gameMode == 3 && desperation == false)
            {
                    traitValue = 0;                
            }

            //check if the die is a special trait die of any game
            if(traitValue > i)
            {
                die.isSpecial = true;
            }
            else
            {
                die.isSpecial = false;
            }

            //determine if die is a success (anything 6 or greater is a success)
            if(die.score <= 5)
            {
                console.log("die failed");
            }
            else
            {
                successes += 1;
            }

            //check for criticals
            if(die.score == 10)
            {
                criticals += 0.5;

                //check for messy critical (specific to vampire only)
                if(gameMode == 1 && die.isSpecial == true)
                {
                    messyCrit = true;
                }
            }

            //check for bestial failure (specific to vampire only)
            if(gameMode == 1 && die.score == 1 && die.isSpecial == true)
            {
                bestialFailure = true;
            }

            //check for brutal outcomes (specific to werewolf only)
            if(gameMode == 2 && die.isSpecial == true)
            {
                if(die.score == 1 || die.score == 2)
                {
                    brutalCount += 0.5;
                }
            }

            //check for deperation outcome (hunter only)
            if(gameMode == 3 && die.isSpecial == true && die.score == 1)
            {
                desperationCount += 1;
            }

            //place images

            //vampire dice images
            if(gameMode == 1)
            {
                if(die.isSpecial == false)
                {
                    if(die.score == 10)
                    {   
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Vampire_Critical.svg\" alt=\"Critical\"></img><p>" + die.score + "</p>";
                    }
                    else if(die.score >= 6 && die.score <=9)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Vampire_Success.svg\" alt=\"Success\"></img><p>" + die.score + "</p>";
                    }
                    else
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Vampire_Failure.svg\" alt=\"Failure\"></img><p>" + die.score + "</p>";
                    }    
                }
                
                else
                {
                    if(die.score == 10)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Vampire_MessyCritical.svg\" alt=\"Messy Critical\"><p>" + die.score + "</p>";
                    }
                    else if(die.score == 1)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Vampire_BestialFailure.svg\" alt=\"Bestial Failure\"><p>" + die.score + "</p>";
                    }
                    else if (die.score >=6 && die.score <= 9)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Vampire_HungerSuccess.svg\" alt=\"Success\"><p>" + die.score + "</p>";
                    }
                    else
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Vampire_HungerFailure.svg\" alt=\"Failure\"><p>" + die.score + "</p>";
                    }
                }
            }

            //werewolf dice images
            else if (gameMode == 2)
            {
                if(die.isSpecial == false)
                {
                    if(die.score == 10)
                    {   
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Werewolf_Critical.svg\" alt=\"Critical\"><p>" + die.score + "</p>";
                    }
                    else if(die.score >= 6 && die.score <=9)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Werewolf_Success.svg\" alt=\"Success\"><p>" + die.score + "</p>";
                    }
                    else
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Werewolf_Failure.svg\" alt=\"Failure\"><p>" + die.score + "</p>";
                    }    
                }
                
                else
                {
                    if(die.score == 10)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Werewolf_RageCritical.svg\" alt=\"Critical\"><p>" + die.score + "</p>";
                    }
                    else if(die.score <= 2)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Werewolf_Brutal.svg\" alt=\"Brutal Outcome\"><p>" + die.score + "</p>";
                    }
                    else if (die.score >=6 && die.score <= 9)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Werewolf_RageSuccess.svg\" alt=\"Success\"><p>" + die.score + "</p>";
                    }
                    else
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Werewolf_RageFailure.svg\" alt=\"Failure\"><p>" + die.score + "</p>";
                    }
                }
            }

            //hunter dice images
            else //gameMode should be 3 at this point
            {
                if (die.isSpecial == false)
                {
                    if(die.score == 10)
                    {   
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Hunter_Critical.svg\" alt=\"Critical\"><p>" + die.score + "</p>";
                    }
                    else if(die.score >= 6 && die.score <=9)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Hunter_Success.svg\" alt=\"Success\"><p>" + die.score + "</p>";
                    }
                    else
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Hunter_Failure.svg\" alt=\"Failure\"><p>" + die.score + "</p>";
                    }    
                }
                
                
                else //gameMode should be 3 for hunter
                {
                    if(die.score == 10)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Hunter_DespCritical.svg\" alt=\"Critical\"><p>" + die.score + "</p>";
                    }
                    else if(die.score == 1)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Hunter_Overreach.svg\" alt=\"Overreach\"><p>" + die.score + "</p>";
                    }
                    else if (die.score >=6 && die.score <= 9)
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Hunter_DespSuccess.svg\" alt=\"Success\"><p>" + die.score + "</p>";
                    }
                    else
                    {
                        diceImages.innerHTML += "<div id=\"diceContainer\"><img src=\"./img/Hunter_DespFailure.svg\" alt=\"Failure\"><p>" + die.score + "</p>";
                    }
                }
            }
        }

        //calculate criticals (for each pair of 10's, increase the successes by 2)
        criticals = Math.floor(criticals);

        //calculate brutal outcome (werewolf only)
        brutalCount = Math.floor(brutalCount);

        if(criticals >= 1)
        {
            successes += criticals * 2;
        }

        // //check for messy critical (specific to vampire only)
        // if(gameMode == 1 && criticals >=1)
        // {
        //     messyCrit = true;
        // }

        //determine the outcome of a Brutal Outcome (werewolf only)
        if(brutalCount >= 1)
        {
            brutalOutcome = confirm("Brutal Outcome! Press 'Ok' if the action was violent or 'Cancel' if it was not.");

            if(brutalOutcome == true)
            {
                successes += 4;
            }
            else
            {
                successes = 0;
                brutalFail = true;
            }
        }

        //determine success of roll

        //if difficulty is more than 0
        if(diffValue > 0)
        {
            //for successes
            if (successes >= diffValue)
            {
                console.log("Roll Successful!");
                result.style.color = "#00B518";

                var successMargin = successes - diffValue;

                //if a messy critical was rolled (vampire only)
                if(gameMode == 1 && messyCrit == true && criticals >= 1)
                {
                    result.innerHTML = "Messy Critical! <br>(Margin of: " + successMargin + ")";
                }

                //if a brutal outcome was rolled and was a violent action (werewolf only)
                else if(gameMode == 2 && brutalOutcome == true)
                {
                    if(criticals >= 1)
                    {
                        result.innerHTML = "Brutal Outcome! Critical! <br>(Margin of: " + successMargin + ")";
                    }
                    else
                    {
                        result.innerHTML = "Brutal Outcome! Success! <br>(Margin of: " + successMargin + ")";
                    }
                }

                //if a 1 was rolled on a desperation die (hunter only)
                else if(gameMode == 3 && desperationCount >= 1)
                {
                    alert("Overreach or Despair! Talk to the Storyteller to determing which occurs! (Overreach Count: " + desperationCount + ")");

                    if(criticals >=1)
                    {
                        result.innerHTML = "Overreach or Despair! Critical! <br>(Margin of: " + successMargin + ")";
                    }
                    else
                    {
                        result.innerHTML = "Overreach or Despair! Success! <br>(Margin of: " + successMargin + ")";
                    }
                }
                else
                {
                    if(criticals >= 1)
                    {
                        result.innerHTML = "Critical! <br>(Margin of: " + successMargin + ")";
                    }
                    else
                    {
                        result.innerHTML = "Success! <br>(Margin of: " + successMargin + ")";
                    }
                }
            }

            //for failures
            else
            {
                result.style.color = "#75031A";

                //check for bestial failure (vampire only)
                if(gameMode == 1 && bestialFailure == true)
                {
                    result.innerHTML = "Bestial Failure!";
                }

                //check for brutal failure (werewolf only)
                else if(gameMode == 2 && brutalFail == true)
                {
                    result.innerHTML = "Brutal Outcome! Failure!";
                }
                //check for despair (hunter only)
                else if(gameMode == 3 && desperationCount >= 1)
                {
                    result.innerHTML = "Despair!";
                }
                else
                {
                    result.innerHTML = "Failure!";
                }
            }
        }

        //if difficulty is 0 (contested rolls)
        else
        {
            console.log("contested roll");

            //vampire related 
            if(gameMode == 1)
            {
                if(messyCrit == true)
                {
                    result.innerHTML = "Messy Critical! ";
                }
                else if(bestialFailure == true)
                {
                    result.innerHTML = "Bestial Failure! ";
                }
                else
                {
                    if(criticals >=1)
                    {
                        result.innerHTML = "Critical! ";
                    }
                }
            }

            //werewolf related
            else if (gameMode == 2)
            {
                if (brutalOutcome == true || brutalFail == true)
                {
                    result.innerHTML = "Brutal Outcome! ";
                }
                else
                {
                    if(criticals >=1)
                    {
                        result.innerHTML = "Critical! ";
                    }
                }
            }

            //hunter related
            else //gameMode should be 3
            {
                if(desperationCount >= 1)
                {
                    result.innerHTML = "Desperation or Overreach! ";
                }
                else
                {
                    if(criticals >=1)
                    {
                        result.innerHTML = "Critical! ";
                    }
                }
            }

            result.innerHTML += successes + " Successes";
        }
    }

    function MakeCheck()
    {
        diceImages.innerHTML = " ";
        number = Math.floor(Math.random() * 10) + 1;

        if(number >= 6)
        {
            console.log("pass");
            if(gameMode == 1)
            {
                diceImages.innerHTML = "<img src=\"./img/Vampire_Success.svg\" alt=\"Success\"></img>";
            }
            else if(gameMode == 2)
            {
                diceImages.innerHTML = "<img src=\"./img/Werewolf_Success.svg\" alt=\"Success\"></img>";
            }
            else //hunter game mode
            {
                diceImages.innerHTML = "<img src=\"./img/Hunter_Success.svg\" alt=\"Success\"></img>";
            }
            result.style.color = "#00B518";
            result.innerHTML = "Check Passed!";
        }
        else //if number < 6
        {
            if(gameMode == 1)
            {
                diceImages.innerHTML = "<img src=\"./img/Vampire_Failure.svg\" alt=\"Failure\"></img>";
            }
            else if(gameMode == 2)
            {
                diceImages.innerHTML = "<img src=\"./img/Werewolf_Failure.svg\" alt=\"Failure\"></img>";
            }
            else //hunter game mode
            {
                diceImages.innerHTML = "<img src=\"./img/Hunter_Failure.svg\" alt=\"Failure\"></img>";
            }
            result.style.color = "#75031A";
            result.innerHTML = "Check Failed!"

        }
    }
}