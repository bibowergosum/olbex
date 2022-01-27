




//<![CDATA[

<!--




//CODE FOR HANDLING NAV BUTTONS AND FUNCTION BUTTONS

function FocusAButton(){
	if (document.getElementById('CheckButton1') != null){
		document.getElementById('CheckButton1').focus();
	}
	else{
		if (document.getElementById('CheckButton2') != null){
			document.getElementById('CheckButton2').focus();
		}
		else{
			document.getElementsByTagName('button')[0].focus();
		}
	}
}




//CODE FOR HANDLING DISPLAY OF POPUP FEEDBACK BOX

var topZ = 1000;

function ShowMessage(Feedback){
	var Output = Feedback + '<br /><br />';
	document.getElementById('FeedbackContent').innerHTML = Output;
	var FDiv = document.getElementById('FeedbackDiv');
	topZ++;
	FDiv.style.zIndex = topZ;
	FDiv.style.top = TopSettingWithScrollOffset(30) + 'px';

	FDiv.style.display = 'block';

	ShowElements(false, 'input');
	ShowElements(false, 'select');
	ShowElements(false, 'object');
	ShowElements(true, 'object', 'FeedbackContent');

//Focus the OK button
	setTimeout("document.getElementById('FeedbackOKButton').focus()", 50);
	
//
}

function ShowElements(Show, TagName, ContainerToReverse){
// added third argument to allow objects in the feedback box to appear
//IE bug -- hide all the form elements that will show through the popup
//FF on Mac bug : doesn't redisplay objects whose visibility is set to visible
//unless the object's display property is changed

	//get container object (by Id passed in, or use document otherwise)
	TopNode = document.getElementById(ContainerToReverse);
	var Els;
	if (TopNode != null) {
		Els = TopNode.getElementsByTagName(TagName);
	} else {
		Els = document.getElementsByTagName(TagName);
	}

	for (var i=0; i<Els.length; i++){
		if (TagName == "object") {
			//manipulate object elements in all browsers
			if (Show == true){
				Els[i].style.visibility = 'visible';
			}
			else{
				Els[i].style.visibility = 'hidden';
			}
		} 
	}
}



function HideFeedback(){
	document.getElementById('FeedbackDiv').style.display = 'none';
	ShowElements(true, 'input');
	ShowElements(true, 'select');
	ShowElements(true, 'object');
}


//GENERAL UTILITY FUNCTIONS AND VARIABLES

//PAGE DIMENSION FUNCTIONS
function PageDim(){
//Get the page width and height
	this.W = 600;
	this.H = 400;
	this.W = document.getElementsByTagName('body')[0].offsetWidth;
	this.H = document.getElementsByTagName('body')[0].offsetHeight;
}

var pg = null;

function GetPageXY(El) {
	var XY = {x: 0, y: 0};
	while(El){
		XY.x += El.offsetLeft;
		XY.y += El.offsetTop;
		El = El.offsetParent;
	}
	return XY;
}

function GetScrollTop(){
	if (typeof(window.pageYOffset) == 'number'){
		return window.pageYOffset;
	}
	else{
		if ((document.body)&&(document.body.scrollTop)){
			return document.body.scrollTop;
		}
		else{
			if ((document.documentElement)&&(document.documentElement.scrollTop)){
				return document.documentElement.scrollTop;
			}
			else{
				return 0;
			}
		}
	}
}

function GetViewportHeight(){
	if (typeof window.innerHeight != 'undefined'){
		return window.innerHeight;
	}
	else{
		if (((typeof document.documentElement != 'undefined')&&(typeof document.documentElement.clientHeight !=
     'undefined'))&&(document.documentElement.clientHeight != 0)){
			return document.documentElement.clientHeight;
		}
		else{
			return document.getElementsByTagName('body')[0].clientHeight;
		}
	}
}

function TopSettingWithScrollOffset(TopPercent){
	var T = Math.floor(GetViewportHeight() * (TopPercent/100));
	return GetScrollTop() + T; 
}

//CODE FOR AVOIDING LOSS OF DATA WHEN BACKSPACE KEY INVOKES history.back()
var InTextBox = false;

function SuppressBackspace(e){ 
	if (InTextBox == true){return;}
	thisKey = e.keyCode;

	var Suppress = false;

	if (thisKey == 8) {
		Suppress = true;
		e.preventDefault();
	}
}

window.addEventListener('keypress',SuppressBackspace,false);

function ReduceItems(InArray, ReduceToSize){
	var ItemToDump=0;
	var j=0;
	while (InArray.length > ReduceToSize){
		ItemToDump = Math.floor(InArray.length*Math.random());
		InArray.splice(ItemToDump, 1);
	}
}

function Shuffle(InArray){
	var Num;
	var Temp = new Array();
	var Len = InArray.length;

	var j = Len;

	for (var i=0; i<Len; i++){
		Temp[i] = InArray[i];
	}

	for (i=0; i<Len; i++){
		Num = Math.floor(j  *  Math.random());
		InArray[i] = Temp[Num];

		for (var k=Num; k < (j-1); k++) {
			Temp[k] = Temp[k+1];
		}
		j--;
	}
	return InArray;
}

function WriteToInstructions(Feedback) {
	document.getElementById('InstructionsDiv').innerHTML = Feedback;

}




function EscapeDoubleQuotes(InString){
	return InString.replace(/"/g, '&quot;')
}

function TrimString(InString){
        var x = 0;

        if (InString.length != 0) {
                while ((InString.charAt(InString.length - 1) == '\u0020') || (InString.charAt(InString.length - 1) == '\u000A') || (InString.charAt(InString.length - 1) == '\u000D')){
                        InString = InString.substring(0, InString.length - 1)
                }

                while ((InString.charAt(0) == '\u0020') || (InString.charAt(0) == '\u000A') || (InString.charAt(0) == '\u000D')){
                        InString = InString.substring(1, InString.length)
                }

                while (InString.indexOf('  ') != -1) {
                        x = InString.indexOf('  ')
                        InString = InString.substring(0, x) + InString.substring(x+1, InString.length)
                 }

                return InString;
        }

        else {
                return '';
        }
}

function FindLongest(InArray){
	if (InArray.length < 1){return -1;}

	var Longest = 0;
	for (var i=1; i<InArray.length; i++){
		if (InArray[i].length > InArray[Longest].length){
			Longest = i;
		}
	}
	return Longest;
}

//SELECTION OBJECT FOR TYPING WITH KEYPAD
var selObj = null;
            
SelObj = function(box){
	this.box = box;
	this.selStart = this.box.selectionStart;
	this.selEnd = this.box.selectionEnd;
	this.selText = this.box.value.substring(this.selStart, this.selEnd);
	return this;
}

function setSelText(newText){
	var caretPos = this.selStart + newText.length;
	var newValue = this.box.value.substring(0, this.selStart);
	newValue += newText;
	newValue += this.box.value.substring(this.selEnd, this.box.value.length);
	this.box.value = newValue;
	this.box.setSelectionRange(caretPos, caretPos);
	this.box.focus();
}
SelObj.prototype.setSelText = setSelText;

function setSelSelectionRange(start, end){
	this.box.setSelectionRange(start, end);
}
SelObj.prototype.setSelSelectionRange = setSelSelectionRange;

//UNICODE CHARACTER FUNCTIONS
function IsCombiningDiacritic(CharNum){
	var Result = (((CharNum >= 0x0300)&&(CharNum <= 0x370))||((CharNum >= 0x20d0)&&(CharNum <= 0x20ff)));
	Result = Result || (((CharNum >= 0x3099)&&(CharNum <= 0x309a))||((CharNum >= 0xfe20)&&(CharNum <= 0xfe23)));
	return Result;
}

function IsCJK(CharNum){
	return ((CharNum >= 0x3000)&&(CharNum < 0xd800));
}

//SETUP FUNCTIONS
//BROWSER WILL REFILL TEXT BOXES FROM CACHE IF NOT PREVENTED
function ClearTextBoxes(){
	var NList = document.getElementsByTagName('input');
	for (var i=0; i<NList.length; i++){
		if ((NList[i].id.indexOf('Guess') > -1)||(NList[i].id.indexOf('Gap') > -1)){
			NList[i].value = '';
		}
		if (NList[i].id.indexOf('Chk') > -1){
			NList[i].checked = '';
		}
	}
}





function Card(ID, OverlapTolerance){
	this.elm=document.getElementById(ID);
	this.name=ID;
	this.css=this.elm.style;
	this.elm.style.left = 0 +'px';
	this.elm.style.top = 0 +'px';
	this.HomeL = 0;
	this.HomeT = 0;
	this.tag=-1;
	this.index=-1;
	this.OverlapTolerance = OverlapTolerance;
}

function CardGetL(){return parseInt(this.css.left)}
Card.prototype.GetL=CardGetL;

function CardGetT(){return parseInt(this.css.top)}
Card.prototype.GetT=CardGetT;

function CardGetW(){return parseInt(this.elm.offsetWidth)}
Card.prototype.GetW=CardGetW;

function CardGetH(){return parseInt(this.elm.offsetHeight)}
Card.prototype.GetH=CardGetH;

function CardGetB(){return this.GetT()+this.GetH()}
Card.prototype.GetB=CardGetB;

function CardGetR(){return this.GetL()+this.GetW()}
Card.prototype.GetR=CardGetR;

function CardSetL(NewL){this.css.left = NewL+'px'}
Card.prototype.SetL=CardSetL;

function CardSetT(NewT){this.css.top = NewT+'px'}
Card.prototype.SetT=CardSetT;

function CardSetW(NewW){this.css.width = NewW+'px'}
Card.prototype.SetW=CardSetW;

function CardSetH(NewH){this.css.height = NewH+'px'}
Card.prototype.SetH=CardSetH;

function CardInside(X,Y){
	var Result=false;
	if(X>=this.GetL()){if(X<=this.GetR()){if(Y>=this.GetT()){if(Y<=this.GetB()){Result=true;}}}}
	return Result;
}
Card.prototype.Inside=CardInside;

function CardSwapColours(){
	var c=this.css.backgroundColor;
	this.css.backgroundColor=this.css.color;
	this.css.color=c;
}
Card.prototype.SwapColours=CardSwapColours;

function CardHighlight(){
	this.css.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--strTextColor');
	this.css.color = getComputedStyle(document.documentElement).getPropertyValue('--strExBGColor');;
}
Card.prototype.Highlight=CardHighlight;

function CardUnhighlight(){
	this.css.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--strExBGColor');
	this.css.color = getComputedStyle(document.documentElement).getPropertyValue('--strTextColor');
}
Card.prototype.Unhighlight=CardUnhighlight;

function CardOverlap(OtherCard){
	var smR=(this.GetR()<(OtherCard.GetR()+this.OverlapTolerance))? this.GetR(): (OtherCard.GetR()+this.OverlapTolerance);
	var lgL=(this.GetL()>OtherCard.GetL())? this.GetL(): OtherCard.GetL();
	var HDim=smR-lgL;
	if (HDim<1){return 0;}
	var smB=(this.GetB()<OtherCard.GetB())? this.GetB(): OtherCard.GetB();
	var lgT=(this.GetT()>OtherCard.GetT())? this.GetT(): OtherCard.GetT();
	var VDim=smB-lgT;
	if (VDim<1){return 0;}
	return (HDim*VDim);	
}
Card.prototype.Overlap=CardOverlap;

//Change for version 7: centre vertically on the docked card.
function CardDockToR(OtherCard){
	this.SetL(OtherCard.GetR() + 5);
	var NewT = Math.floor(Math.max(((OtherCard.GetH() - this.GetH()) / 2) + OtherCard.GetT()), OtherCard.GetT());
	this.SetT(NewT);
}

Card.prototype.DockToR=CardDockToR;

function CardSetHome(){
	this.HomeL=this.GetL();
	this.HomeT=this.GetT();
}
Card.prototype.SetHome=CardSetHome;

function CardGoHome(){
	this.SetL(this.HomeL);
	this.SetT(this.HomeT);
}

Card.prototype.GoHome=CardGoHome;

//Fix for 6.2.5.2: avoid image dragging problem in draggable cards
function CardSetHTML(HTML){
	this.elm.innerHTML = HTML;
	var DragImgs = this.elm.getElementsByTagName('img');
	if (DragImgs.length > 0){
		for (var i=0; i<DragImgs.length; i++){
			DragImgs[i].addEventListener('onmousedown', function(e){return false;});
		}
	}
}

Card.prototype.SetHTML = CardSetHTML;

var CurrDrag = -1;
var topZ = 100;





//JMIX DRAG-DROP OUTPUT FORMAT CODE

//Work around Safari bug
var scrollable = true;

var listener = function(e) {
    if (! scrollable) {
        e.preventDefault();
    }
}

var Punctuation = '\u002E\u002C';

var Openers = '';
var CorrectResponse = 'Korrekt!';
var IncorrectResponse = 'Leider falsch';
var ThisMuchCorrect = 'Deine L&#x00F6;sung ist bis hierhin korrekt:';
var TheseAnswersToo = 'Diese Antworten w&#x00E4;ren auch korrekt:';
var YourScoreIs = 'Dein Ergebnis liegt bei ';
var NextCorrect = 'Der n&#x00E4;chste korrekte Satz ist: ';
var FeedbackWidth = 200; //default
var ExBGColor = getComputedStyle(document.documentElement).getPropertyValue('--strExBGColor');
var PageBGColor = getComputedStyle(document.documentElement).getPropertyValue('--strPageBGColor');
var TextColor = getComputedStyle(document.documentElement).getPropertyValue('--strTextColor');
var TitleColor = getComputedStyle(document.documentElement).getPropertyValue('--strTitleColor');
var DropTotal = 3; // number of lines that will be available for dropping on
var Gap = 4; //Gap between two segments when they're next to each other on a line
var DropHeight = 30;
var CapitalizeFirst = false;
var CompiledOutput = '';
var TempSegment = '';
var FirstSegment = -1;
var FirstDiv = -1;
var Penalties = 0;
var Score = 0;
var TimeOver = false;

var CurrDrag = -1;
var topZ = 100;
//Cards and lines on which to drop them.
var DC = new Array();
var L = new Array();
var Finished = false;

var Locked = false;
var DragTop = 120;
var DragNumber = -1;
var AnswersTried = '';

Lines = new Array();

function CapFirst(InString){
	var i = 0;
	if ((Openers.indexOf(InString.charAt(i))>-1)||(InString.charAt(i) == ' ')){
		i++;
	}
	if ((Openers.indexOf(InString.charAt(i))>-1)||(InString.charAt(i) == ' ')){
		i++;
	}
	var Temp = InString.charAt(i);
	Temp = Temp.toUpperCase();
	InString = InString.substring(0, i) + Temp + InString.substring(i+1, InString.length);
	return InString;
}

function CheckResults(ChkType){
//Get sequence student has chosen
	GetGuessSequence();

//Compile the answer
	CompiledOutput = CompileString(GuessSequence);

//Check the answer
	CheckAnswer(ChkType);
}

function GetGuessSequence(){
//Put pointers to draggables in arrays based on the lines they're sitting on
	var Drops = new Array();
	for (var i=0; i<L.length; i++){
		Drops[i] = new Array();
	}

	var CardPos = 0;
	
	for (i=0; i<DC.length; i++){
		for (var j=0; j<L.length; j++){
//Slight modification for 6.0.4: allow some leeway for 1px inaccuracy in card placing by browser.
			CardPos = L[j].GetB() - (DC[i].GetH()+2);
			if (((DC[i].GetT() - CardPos) < 4)&&((DC[i].GetT() - CardPos) > -4)){
				Drops[j][Drops[j].length] = DC[i];
			}
		}
	}

//Sort the drop arrays based on the Left of each div
	for (i=0; i<Drops.length; i++){
		Drops[i].sort(CompDrags);
	}

//Put the tags into the GuessSequence array
	GuessSequence.length = 0;
	for (i=0; i<Drops.length; i++){
		for (j=0; j<Drops[i].length; j++){
			GuessSequence[GuessSequence.length] = Drops[i][j].tag;
		}
	}

//Set the variable recording which div is first
	var NewFirstDiv = -1;
	for (i=0; i<Drops.length; i++){
		if (Drops[i].length > 0){
			NewFirstDiv = Drops[i][0].index;
			break;
		}
	}
	return NewFirstDiv;
}

function CompDrags(a,b){
	return a.GetL() - b.GetL(); 
}

function RestoreGuessSequence(){
//TODO: This function will restore the sequence
//of dropped items following a window resize, which
//requires that everything be laid out again.
	var LastTop   = 0;
	var LastRight = 0;
	var LastDrop  = 0;
	var LastDropLine = document.getElementById('Drop0');
	for (var i=0; i<GuessSequence.length; i++){
		for (var j=0; j<DC.length; j++){
			if (DC[j].tag == GuessSequence[i]){
				if (i == 0){
//It's the first card.			
					DC[j].SetL(LastDropLine.offsetLeft);
					DC[j].SetT(LastDropLine.offsetTop);	
					LastTop = LastDropLine.offsetTop;
					LastRight = DC[j].GetR();
				}
				else{
					DC[j].SetT(LastTop);
					DC[j].SetL(LastRight + 4);
					LastRight = DC[j].GetR();
					if (LastRight > (LastDropLine.offsetLeft + LastDropLine.offsetWidth)){
						LastDrop++;
						LastDropLine = document.getElementById('Drop' + LastDrop);
						if (LastDropLine !== null){
							DC[j].SetL(LastDropLine.offsetLeft);
							DC[j].SetT(LastDropLine.offsetTop);
							LastTop = DC[j].GetT();
							LastRight = DC[j].GetR();
						}
					}
				}
			}
		}
	}
	CheckOver(-1);
}

function FindSegment(SegID){
	var Seg = '';
	for (var i=0; i<Segments.length; i++){
		if (Segments[i][1] == SegID){
			Seg = Segments[i][0];
			break;
		}
	}
	return Seg;
}

function CompileString(InArray){
	var OutString = '';
	var i = 0;
	OutArray = new Array();

	for (i=0; i<InArray.length; i++){
		OutArray[OutArray.length] = FindSegment(InArray[i]);
	}

	if (OutArray.length > 0){
		OutString = OutArray[0];
	}
	else{
		OutString = '';
	}
	var Spacer = '';

	for (i=1; i<OutArray.length; i++){
		Spacer = ' ';
		if ((Openers.indexOf(OutString.charAt(OutString.length-1)) > -1)||(Punctuation.indexOf(OutArray[i].charAt(0)) > -1)){
			Spacer = '';
		}
		OutString = OutString + Spacer + OutArray[i];		
	}

//Capitalize the first letter if necessary
	if (CapitalizeFirst == true){
		OutString = CapFirst(OutString);
	}
	return OutString;
}

function CheckAnswer(CheckType){
	if (Locked == true){return;}
	if (GuessSequence.length < 1){
		if (CheckType == 1){
			Penalties++;
			ShowMessage(NextCorrect + '<br /><br />' + FindSegment(Answers[0][0]));
		}
		return;
	}
	var i = 0;
	var j = 0;
	var k = 0;
	var WellDone = '';
	var WhichCorrect = -1;
	var TryAgain = '';
	var LongestCorrectBit = '';
	TempCorrect = new Array();
	LongestCorrect = new Array();
	var TempHint = '';
	var HintToReturn = 1;
	var OtherAnswers = '';
	var AllDone = false;

	for (i=0; i<Answers.length; i++){
		TempCorrect.length = 0;
		for (j=0; j<Answers[i].length; j++){
			if (Answers[i][j] == GuessSequence[j]){
				TempCorrect[j] = GuessSequence[j];
			}
			else{
				TempHint = Answers[i][j];
				break;
			}
		}
		if ((TempCorrect.length == GuessSequence.length)&&(TempCorrect.length == Answers[i].length)){
			WhichCorrect = i;
			break;
		}
		else{
			if (TempCorrect.length > LongestCorrect.length){
				LongestCorrect.length = 0;
				for (k=0; k<TempCorrect.length; k++){
					LongestCorrect[k] = TempCorrect[k];
				}
				HintToReturn = TempHint;
			} 
		}	
	}
	if (WhichCorrect > -1){
		AllDone = true;
		for (i=0; i<Answers.length; i++){
			if (i!=WhichCorrect){
				OtherAnswers += '<br />' + CompileString(Answers[i]);
			}
		}
		WellDone = '<span class="CorrectAnswer">' + CompiledOutput + '</span><br /><br />' + CorrectResponse + '<br />';
		
		if (AnswersTried.length > 0){AnswersTried += ' | ';}
		AnswersTried += CompiledOutput;

//Do score calculation here
		Score = Math.floor(((Segments.length-Penalties) * 100)/Segments.length);
		WellDone += YourScoreIs + ' ' + Score + '%.<br />';


		if (OtherAnswers.length > 0){
			WellDone += TheseAnswersToo + '<span class="CorrectAnswer">' + OtherAnswers + '</span>';
		}


		ShowMessage(WellDone);
		WriteToInstructions(YourScoreIs + ' ' + Score + '%.');
	}

	else{
		var WrongGuess = CompileString(GuessSequence);
		if (AnswersTried.length > 0){AnswersTried += ' | ';}
		AnswersTried += WrongGuess;
		TryAgain = '<span class="Guess">' + WrongGuess + '</span><br /><br />';
		if ((CheckType == 0)||(LongestCorrect.length==0)){
			TryAgain += IncorrectResponse + '<br />';
		}

		if (LongestCorrect.length > 0){
			LongestCorrectBit = CompileString(LongestCorrect);
			GuessSequence.length = LongestCorrect.length;
			TryAgain += '<br />' + ThisMuchCorrect + '<br /><span class="Guess">' + LongestCorrectBit + '</span><br />';
		}

		if (CheckType == 1){
			TryAgain += '<br />' + NextCorrect + '<br />' + FindSegment(HintToReturn);
		}
		

		Penalties++; //Penalty for inaccurate check
		ShowMessage(TryAgain);
	}
	
//If the exercise is over, deal with that
	if ((AllDone == true)||(TimeOver == true)){


		TimeOver = true;
		Locked = true;
		Finished = true;
		WriteToInstructions(YourScoreIs + ' ' + Score + '%.'); 
	}
	

}


var Segments = new Array();
Segments[0] = new Array();
Segments[0][0] = '\u0041\u006C\u0073\u0020\u0065\u0072\u0020\u0037\u0020\u004A\u0061\u0068\u0072\u0065\u0020\u0061\u006C\u0074\u0020\u0077\u0061\u0072\u002C\u0020\u0074\u0072\u0061\u0074\u0020\u0065\u0072\u0020\u0064\u0061\u0073\u0020\u0065\u0072\u0073\u0074\u0065\u0020\u004D\u0061\u006C\u0020\u00F6\u0066\u0066\u0065\u006E\u0074\u006C\u0069\u0063\u0068\u0020\u0061\u006C\u0073\u0020\u0050\u0069\u0061\u006E\u0069\u0073\u0074\u0020\u0061\u0075\u0066\u002E';
Segments[0][1] = 2;
Segments[0][2] = 0;
Segments[1] = new Array();
Segments[1][0] = '\u0044\u0069\u0065\u0020\u0065\u0072\u0073\u0074\u0065\u006E\u0020\u0050\u0072\u006F\u0062\u006C\u0065\u006D\u0065\u0020\u006D\u0069\u0074\u0020\u0064\u0065\u006D\u0020\u0047\u0065\u0068\u00F6\u0072\u0020\u006B\u0061\u006D\u0065\u006E\u0020\u0062\u0065\u0072\u0065\u0069\u0074\u0073\u0020\u0069\u006D\u0020\u0041\u006C\u0074\u0065\u0072\u0020\u0076\u006F\u006E\u0020\u0032\u0038\u0020\u004A\u0061\u0068\u0072\u0065\u006E\u002E';
Segments[1][1] = 5;
Segments[1][2] = 0;
Segments[2] = new Array();
Segments[2][0] = '\u0045\u0074\u0077\u0061\u0020\u0031\u0030\u0020\u004A\u0061\u0068\u0072\u0065\u0020\u0076\u006F\u0072\u0020\u0073\u0065\u0069\u006E\u0065\u006D\u0020\u0054\u006F\u0064\u0020\u0077\u0061\u0072\u0020\u0065\u0072\u0020\u0061\u0062\u0073\u006F\u006C\u0075\u0074\u0020\u0074\u0061\u0075\u0062\u002E';
Segments[2][1] = 6;
Segments[2][2] = 0;
Segments[3] = new Array();
Segments[3][0] = '\u004C\u0075\u0064\u0077\u0069\u0067\u0020\u0076\u0061\u006E\u0020\u0042\u0065\u0065\u0074\u0068\u006F\u0076\u0065\u006E\u0020\u0077\u0075\u0072\u0064\u0065\u0020\u0031\u0037\u0037\u0030\u0020\u0069\u006E\u0020\u0042\u006F\u006E\u006E\u0020\u0067\u0065\u0062\u006F\u0072\u0065\u006E\u002E';
Segments[3][1] = 1;
Segments[3][2] = 0;
Segments[4] = new Array();
Segments[4][0] = '\u0048\u0069\u0065\u0072\u0020\u006E\u0061\u0068\u006D\u0020\u0065\u0072\u0020\u0055\u006E\u0074\u0065\u0072\u0072\u0069\u0063\u0068\u0074\u0020\u0062\u0065\u0069\u0020\u004A\u006F\u0073\u0065\u0070\u0068\u0020\u0048\u0061\u0079\u0064\u006E\u002E';
Segments[4][1] = 4;
Segments[4][2] = 0;
Segments[5] = new Array();
Segments[5][0] = '\u0042\u0065\u0065\u0074\u0068\u006F\u0076\u0065\u006E\u0020\u0073\u0074\u0061\u0072\u0062\u0020\u0031\u0038\u0032\u0037\u0020\u0069\u006E\u0020\u0057\u0069\u0065\u006E\u002E';
Segments[5][1] = 7;
Segments[5][2] = 0;
Segments[6] = new Array();
Segments[6][0] = '\u0031\u0037\u0039\u0032\u0020\u007A\u006F\u0067\u0020\u0065\u0072\u0020\u006E\u0061\u0063\u0068\u0020\u0057\u0069\u0065\u006E\u002E';
Segments[6][1] = 3;
Segments[6][2] = 0;


var GuessSequence = new Array();

var Answers = new Array();
Answers[0] = new Array(1,2,3,4,5,6,7);


function doDrag(e) {
	if (CurrDrag == -1) {return};
	var currX, currY;
	var difX, difY;
	if (e.touches){
		currX = e.touches[0].clientX;
		currY = e.touches[0].clientY;
	}
	else{
		currX = e.clientX;
		currY = e.clientY; 
	}
	
	difX = currX - window.lastX; 
	difY = currY - window.lastY;
	var newX = DC[CurrDrag].GetL()+difX; 
	var newY = DC[CurrDrag].GetT()+difY; 
	DC[CurrDrag].SetL(newX); 
	DC[CurrDrag].SetT(newY);
	window.lastX = currX; 
	window.lastY = currY; 
	return false;
} 

var moveFunc = function(e){e.preventDefault(); doDrag(e);};
var endFunc = function(e){e.preventDefault(); endDrag(e);};

function beginDrag(e, DragNum) { 
	scrollable = false;
	CurrDrag = DragNum;

	window.addEventListener('mousemove', moveFunc);
	window.addEventListener('mouseup', endFunc);
	window.addEventListener('touchmove', moveFunc);
	window.addEventListener('touchend', endFunc);

	var currX, currY;
	if (e.touches){
		currX = e.touches[0].clientX;
		currY = e.touches[0].clientY;
	}
	else{
		currX = e.clientX;
		currY = e.clientY; 
	}

	DC[CurrDrag].Highlight();
	topZ++;
	DC[CurrDrag].css.zIndex = topZ;
	window.lastX = currX; 
	window.lastY = currY;
	return false;  
}  

function endDrag(e) { 
	if (CurrDrag == -1) {return};
	DC[CurrDrag].Unhighlight();
	window.removeEventListener('mousemove', moveFunc);
	window.removeEventListener('touchmove', moveFunc);
	window.removeEventListener('mouseup', endFunc);
	window.removeEventListener('touchend', endFunc);
	onEndDrag();	
	CurrDrag = -1;
	scrollable = true;
	return true;
} 

function onEndDrag(){
//Snap to lines
	var i = 0;
	var SnapLine = DC[CurrDrag].GetT();
	var BiggestOverlap = -1;
	var OverlapRect = 0;
	for (i=0; i<L.length; i++){
		if (DC[CurrDrag].Overlap(L[i]) > OverlapRect){
			OverlapRect = DC[CurrDrag].Overlap(L[i]);
			BiggestOverlap = i;
		}
	}
	if (BiggestOverlap > -1){
		SnapLine = L[BiggestOverlap].GetB() - (DC[CurrDrag].GetH() + 2);
		DC[CurrDrag].SetT(SnapLine);
		CheckOver(-1);
	}
	if (CapitalizeFirst==true){
		setTimeout('DoCapitalization()', 50);
	}
//Get the guess sequence every time so we can restore it
//if the page is resized.
	GetGuessSequence();
}

function DoCapitalization(){
//Capitalize first segment if necessary
	var FD = GetGuessSequence();
	if ((FD == -1)&&(FirstDiv > -1)){
		DC[FirstDiv].SetHTML(Segments[FirstDiv][0]);
	}
	if (((FD != FirstDiv)&&(CapitalizeFirst == true))&&(FD > -1)){
		if (FirstDiv > -1){
			DC[FirstDiv].SetHTML(Segments[FirstDiv][0]);
		}
	}
	if ((FD > -1)&&(CapitalizeFirst == true)){
		var Temp = CapFirst(Segments[FD][0]);
		DC[FD].SetHTML(Temp);
		FirstDiv = FD;
	}
}

function CheckOver(NoMove){
//This recursive function spreads out the Cards on a line if two of them are overlapping;
//if the spread operation moves one beyond the end of a line, it wraps it to the next line.
	var LeftBoundary = L[0].elm.offsetLeft;
	var LineWidth = L[0].elm.offsetWidth;
	for (var i=0; i<DC.length; i++){
		for (var j=0; j<DC.length; j++){
			if (i!=j){
				if (DC[i].Overlap(DC[j]) > 0){
					if ((i==NoMove)||(DC[i].GetL() < DC[j].GetL())){
						DC[j].DockToR(DC[i]);
						if (DC[j].GetR() > (LeftBoundary + LineWidth)){
							DC[j].SetL(LeftBoundary);
							DC[j].SetT(DC[j].GetT() + DropHeight);
						}
						CheckOver(j);
					}
					else{
						DC[i].DockToR(DC[j]);
						if (DC[i].GetR() > (LeftBoundary + LineWidth)){
							DC[i].SetL(LeftBoundary);
							DC[i].SetT(DC[i].GetT() + DropHeight);
						}
						CheckOver(i);	
					}
				}
			}	
		}
	}
}

function StartUp(){







//Create the drop lines and cards.
	var ExDiv = document.querySelector('div.ExerciseContainer');
	
	var newLine = null;
	var newCard = null;
    for (var i=0; i<DropTotal; i++){
		newLine = document.createElement('div');
		newLine.setAttribute('id', 'Drop' + i);
		newLine.setAttribute('class', 'DropLine');
		newLine.appendChild(document.createElement('br'));
		newLine.appendChild(document.createElement('br'));
		ExDiv.appendChild(newLine);
	}

	for (var i=0; i<Segments.length; i++){
		newCard = document.createElement('div');
		newCard.setAttribute('id', 'D' + i);
		newCard.setAttribute('dataNum', i);
		newCard.setAttribute('class', 'CardStyle');
		ExDiv.appendChild(newCard);
		newCard.addEventListener('mousedown', function(e){beginDrag(e, this.getAttribute('dataNum'))}.bind(newCard));
		newCard.addEventListener('touchstart', function(e){beginDrag(e, this.getAttribute('dataNum'))}.bind(newCard));
	}

	Segments = Shuffle(Segments);

//Place them at the bottom of the page
	SetInitialPositions();
	
//Allow for resizing
	window.addEventListener('resize', function(){SetInitialPositions()});


}

function SetInitialPositions(){
//This function lays out all the elements that are
//positioned absolutely. It may be called every time
//the page is resized.

	DragTop = parseInt(document.getElementById('CheckButtonDiv').offsetHeight) + parseInt(document.getElementById('CheckButtonDiv').offsetTop) + 10;

	var ExDiv = document.querySelector('div.ExerciseContainer');

//Get the default font size.
	var FontSize = Math.round(parseFloat(getComputedStyle(ExDiv).fontSize));
	
	var ExDivLeft = ExDiv.offsetLeft;
	var ExDivWidth = ExDiv.offsetWidth;
	var Indent = Math.floor(ExDivWidth / 20);
	var DropLineWidth = Math.floor((ExDivWidth * 9) / 10);

	var CurrTop = DragTop + 10;

//Position the drop divs
	for (var i=0; i<DropTotal; i++){
		L[i] = new Card('Drop' + i, 0);
		L[i].SetT(CurrTop)
		L[i].tag = CurrTop-5;
		L[i].SetL(ExDivLeft + Indent);
		L[i].SetW(DropLineWidth);
		L[i].css.backgroundColor = PageBGColor;
		CurrTop += L[i].GetH();
		topZ++;
		L[i].css.zIndex = topZ;
	}
	DropHeight = L[0].GetH();

	CurrTop = DragTop;
	var TempInt = 0;
	var DropHome = 0;

	for (i=0; i<Segments.length; i++){
//Create a new pointer in the C array to ref the card div
		DC[i] = new Card('D'+i, 0);
		DC[i].elm.classList.add('CardStyleCentered');
		DC[i].SetHTML(Segments[i][0]);
		DC[i].SetT(CurrTop);
		DC[i].SetL(-100);
		DC[i].css.cursor = 'move';
		TempInt = DC[i].GetH();
		CurrTop = CurrTop + TempInt + 5;
		DC[i].css.backgroundColor = ExBGColor;
		DC[i].css.color = TextColor;
		topZ++;
		DC[i].css.zIndex = topZ;
		DC[i].tag = Segments[i][1];
		DC[i].index = i;
	}

//Places all the divs at the bottom of the exercise div in centred rows
//First, get the vertical position of the first row
	var RTop = L[L.length-1].GetB() + 10;

//Create an array to hold the numbers of Cards for each row
	CRows = new Array();
	CRows[0] = new Array();
	Widths = new Array();
	var i=0;
	var r=0;
	var RowWidth=0;
//Sort the Cards into rows, storing their numbers in the array

	while (i<DC.length){
//if it fits on this row, add it
		if ((RowWidth + DC[i].GetW() + 5) < DropLineWidth){
			CRows[r][CRows[r].length] = i;
			RowWidth += DC[i].GetW() + 5;
//Store the width in the Widths array for later
			Widths[r] = RowWidth;
		}
//if not, increment the row number, and add it to the next row
		else{
			r++;
			CRows[r] = new Array();
			CRows[r][CRows[r].length] = i;
			RowWidth = DC[i].GetW() + 5;
//Store the width in the Widths array for later
			Widths[r] = RowWidth;
		}
//move to the next Card
		i++;
	}
//Now we have the numbers in rows, set out each row
	r=0;
	
	for (r=0; r<CRows.length; r++){
//Get the required extra indent for this row
		ExtraIndent = Math.floor((DropLineWidth-Widths[r])/2);
		
//Set the first card in position
		DC[CRows[r][0]].SetL(ExDivLeft + Indent + ExtraIndent);
		DC[CRows[r][0]].SetT(RTop);
		DC[CRows[r][0]].SetHome();
		for (i=1; i<CRows[r].length; i++){
			DC[CRows[r][i]].DockToR(DC[CRows[r][i-1]]);
			DC[CRows[r][i]].SetHome();
		}
//Increment the row height
		RTop += DC[0].GetH() + 5;
	}
	
//Now we clone the top navbar to create a bottom
//navbar, and position it.
	var TopNav = document.getElementById('TopNavBar');
	var ReadingDiv = document.getElementById('ReadingDiv');
	
	if (TopNav !== null){
//First delete one if there is one.
		var BottomNav = document.getElementById('BottomNavBar');
		if (BottomNav === null){
			BottomNav = document.getElementById('TopNavBar').cloneNode(true);
			BottomNav.setAttribute('id', 'BottomNavBar');
			BottomNav.style.position = 'absolute';
			document.body.appendChild(BottomNav);
		}
		var LastCard = DC[CRows[CRows.length - 1][0]].elm;
		var ReadingBottom = (ReadingDiv !== null)? ReadingDiv.offsetTop + ReadingDiv.offsetHeight : 0;
		var LastCardBottom = LastCard.offsetTop + LastCard.offsetHeight;
		BottomNav.style.top = (Math.max(ReadingBottom, LastCardBottom) + FontSize) + 'px';
		BottomNav.style.width = document.getElementById('TopNavBar').offsetWidth + 'px';
	}
//Finally we restore any existing guess sequence, in case
//this function has been triggered by a window resize.
	RestoreGuessSequence();

}

function TimerStartUp(){
	setTimeout('StartUp()', 300);
}








//-->

//]]>


