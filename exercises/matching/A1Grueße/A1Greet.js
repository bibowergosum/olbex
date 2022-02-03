

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





//Polyfill for old Safari versions.
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}



//JMATCH-SPECIFIC CORE JAVASCRIPT CODE

//Work around Safari bug
var scrollable = true;

var listener = function(e) {
    if (! scrollable) {
        e.preventDefault();
    }
}

document.addEventListener('touchmove', listener, { passive:false });

var CorrectResponse = 'Alles richtig! Sehr gut!';
var IncorrectResponse = 'Einige Antworten sind leider falsch. ';
var YourScoreIs = 'Dein Ergebnis liegt bei';
var FeedbackWidth = 200; //default
var ExBGColor = getComputedStyle(document.documentElement).getPropertyValue('--strExBGColor');
var PageBGColor = getComputedStyle(document.documentElement).getPropertyValue('--strPageBGColor');
var TextColor = getComputedStyle(document.documentElement).getPropertyValue('--strTextColor');
var TitleColor = getComputedStyle(document.documentElement).getPropertyValue('--strTitleColor');
var Penalties = 0;
var Score = 0;
var TimeOver = false;
var Locked = false;
var ShuffleQs = false;
var QsToShow = 0;
var ResizeTimer = null;

var LeftColPos = 100;
var RightColPos = 500;
var DragTop = 120;
var Finished = false;
var AnswersTried = '';

//Fixed and draggable card arrays
FC = new Array();
DC = new Array();

var DraggingCard = null;
var moveFunc = function(e){e.preventDefault(); doDrag(e)};
var endFunc = function(e){e.preventDefault(); endDrag(e)};

function beginDrag(e, Card){
	scrollable = false;
	DraggingCard = Card;
	DraggingCard.Highlight();
	window.addEventListener('mousemove',  moveFunc);
	window.addEventListener('mouseup',    endFunc);
	window.addEventListener('touchmove',  moveFunc);
	window.addEventListener('touchend',   endFunc);
	var currX, currY;
	if (e.touches){
		currX = e.touches[0].clientX;
		currY = e.touches[0].clientY;
	}
	else{
		currX = e.clientX;
		currY = e.clientY; 
	}

	topZ++;
	DraggingCard.style.zIndex = topZ;
	window.lastX = currX; 
	window.lastY = currY;
	return false;  
} 


function doDrag(e) {
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
	DraggingCard.style.left = DraggingCard.GetL() + difX + 'px'; 
	DraggingCard.style.top  = DraggingCard.GetT() + difY + 'px'; 
	window.lastX = currX; 
	window.lastY = currY; 
	return false;
} 

function endDrag(e) { 
	DraggingCard.Unhighlight();
	window.removeEventListener('mousemove', moveFunc);
	window.removeEventListener('touchmove', moveFunc);
	window.removeEventListener('mouseup', endFunc);
	window.removeEventListener('touchend', endFunc);
	onEndDrag();
	scrollable = true;
	return true;
} 

function onEndDrag(){ 
	DraggingOrigPos = parseInt(DraggingCard.getAttribute('id').substring(2));
	DragEx.HandleDrop(DraggingOrigPos);
	DraggingCard = null;
} 

//Utility functions for dimensions of elements.
var GetL = function(){
	return this.offsetLeft;
}
var GetR = function(){
	return this.offsetLeft + this.offsetWidth;
}
var GetT = function(){
	return this.offsetTop;
}
var GetB = function(){
	return this.offsetTop + this.offsetHeight;
}
var GetH = function(){
	return this.offsetHeight;
}
var GetW = function(){
	return this.offsetWidth;
}
var Highlight = function(){
	this.style.backgroundColor = TextColor;
	this.style.color = ExBGColor;
};
var Unhighlight = function(){
	this.style.backgroundColor = ExBGColor;
	this.style.color = TextColor;
};
var GetOverlap = function(OtherCard){
	var smR=(this.GetR() < OtherCard.GetR())? this.GetR(): OtherCard.GetR();
	var lgL=(this.GetL() > OtherCard.GetL())? this.GetL(): OtherCard.GetL();
	var HDim=smR-lgL;
	if (HDim<1){return 0;}
	var smB=(this.GetB() < OtherCard.GetB())? this.GetB(): OtherCard.GetB();
	var lgT=(this.GetT() > OtherCard.GetT())? this.GetT(): OtherCard.GetT();
	var VDim=smB-lgT;
	if (VDim<1){return 0;}
	return (HDim*VDim);	
};

/*
  The new V7 DragEx object replaces the arrays of old.
*/
var V7JsonEx = '{  "ShuffleLeftItems": false,  "IsSimple": false,  "ItemsToShow": -1,  "LeftItems": [{"OrigPos": 0,     "Group": 0}, {"OrigPos": 1,     "Group": 1}, {"OrigPos": 2,     "Group": 2}, {"OrigPos": 3,     "Group": 3}, {"OrigPos": 4,     "Group": 4}, {"OrigPos": 5,     "Group": 5}, {"OrigPos": 6,     "Group": 6}],  "RightItems": [{"OrigPos": 0,     "Groups": [0], "MatchedWith": -1}, {"OrigPos": 1,     "Groups": [1], "MatchedWith": -1}, {"OrigPos": 2,     "Groups": [2], "MatchedWith": -1}, {"OrigPos": 3,     "Groups": [3], "MatchedWith": -1}, {"OrigPos": 4,     "Groups": [4], "MatchedWith": -1}, {"OrigPos": 5,     "Groups": [5], "MatchedWith": -1}, {"OrigPos": 6,     "Groups": [6], "MatchedWith": -1}]}';

var DragEx = JSON.parse(V7JsonEx);

//Methods for the object.
DragEx.Setup = function(){
	var i;
	






//Add custom functions to all the cards.
	document.querySelectorAll('div.CardStyle').forEach(function(div){
		div.Highlight = Highlight.bind(div);
		div.Unhighlight = Unhighlight.bind(div);
		div.GetL = GetL.bind(div);
		div.GetT = GetT.bind(div);
		div.GetR = GetR.bind(div);
		div.GetB = GetB.bind(div);
		div.GetH = GetH.bind(div);
		div.GetW = GetW.bind(div);
		div.GetOverlap = GetOverlap.bind(div);
	}.bind(this));
	
//Connect each of the items to its card.
	this.LeftItems.forEach(function(LI){
		LI.Card = document.getElementById('L_' + LI.OrigPos);
	}.bind(this));
	this.RightItems.forEach(function(RI){
		RI.Card = document.getElementById('R_' + RI.OrigPos);
		RI.Card.addEventListener('mousedown',  (function(e){beginDrag(e, this)}.bind(RI.Card)));
		RI.Card.addEventListener('touchstart', (function(e){beginDrag(e, this)}.bind(RI.Card)));
		RI.Card.style.cursor = 'grab';
	}.bind(this));
//Reduce the items as required. Sanity check: don't allow less than 2.
	if (this.ItemsToShow > 2){
		while (this.LeftItems.length > this.ItemsToShow){
			RemItem = Math.floor(this.LeftItems.length*Math.random());
			OP = this.LeftItems[RemItem].OrigPos;
			this.LeftItems[RemItem].Card.parentNode.removeChild(this.LeftItems[RemItem].Card);
			this.LeftItems.splice([RemItem], 1);

//Having removed an item from the left, we must remove the corresponding 
//one from the right if it exists. (There may not be a matching item if 
//the one removed was a distractor.)
			for (i = 0; i < this.RightItems.length; i++){
				if (this.RightItems[i].OrigPos == OP){
					this.RightItems[i].Card.parentNode.removeChild(this.RightItems[i].Card);
					this.RightItems.splice(i, 1);
				}
			}
		}
	}
//Now do any shuffling that's required.
	if (this.ShuffleLeftItems == true){
		this.LeftItems = Shuffle(this.LeftItems);
	}
	this.RightItems = Shuffle(this.RightItems);
	
	this.SetInitialPositions(true);
	
//Fix to avoid image dragging problem in cards with images.
	var DragImgs = document.querySelectorAll('div.CardStyle img');
	for (i = 0; i<DragImgs.length; i++){
		DragImgs[i]. onmousedown = function(){return false;}
	}

//We use a timeout here to allow card positions to be established
//before they're used for sliding matched cards.
	window.addEventListener('resize', function(e){
		clearTimeout(ResizeTimer);
		ResizeTimer = setTimeout(function(){DragEx.SetInitialPositions(false)}, 250);
	});

	

};

DragEx.GetLeftItemByOrigPos = function(Pos){
	for (var i=0; i<this.LeftItems.length; i++){
		if (this.LeftItems[i].OrigPos === Pos){
			return this.LeftItems[i];
		}
	}
	return null;
};

DragEx.GetRightItemByOrigPos = function(Pos){
	for (var i=0; i<this.RightItems.length; i++){
		if (this.RightItems[i].OrigPos === Pos){
			return this.RightItems[i];
		}
	}
	return null;
};

DragEx.SendHome = function(ROrigPos){
	Slide(ROrigPos, this.GetRightItemByOrigPos(ROrigPos).Home);
};

DragEx.SetInitialPositions = function(slide){
	
	var ExDiv = document.querySelector('div.ExerciseContainer');
	
//Get the default font size.
	var FontSize = Math.round(parseFloat(getComputedStyle(ExDiv).fontSize));
	
//Get the value of any drop-shadow on the cards so we can allow for it in layout.
	var DS =  window.getComputedStyle(this.LeftItems[0].Card).getPropertyValue('box-shadow').split('px ');
	var DSOffset = 5;
	if ((DS.length > 1)&&(!(Number.isNaN(parseFloat(DS[1]))))){
		DSOffset += Math.abs(Math.ceil(parseFloat(DS[1])));
	}
	
//Calculate container dimensions and positions
	DragTop = parseInt(document.getElementById('CheckButtonDiv').offsetHeight) + parseInt(document.getElementById('CheckButtonDiv').offsetTop) + DSOffset;
	
	var ExDivLeft = ExDiv.offsetLeft;
	var ExDivWidth = ExDiv.offsetWidth;	
	var Indent = Math.min(Math.floor(ExDivWidth / 20), FontSize);
	var DragWidth = Math.floor(ExDivWidth / 4);
	LeftColPos = ExDivLeft + Indent;

//Calculate the width for the left items.	
	var WidestLeft = 0;
	for (var i=0; i<this.LeftItems.length; i++){
		var CurrCard = this.LeftItems[i].Card;
		CurrCard.style.width = '';
		CurrCard.style.height = '';
		var w = CurrCard.GetW() + 10;
		if (w > WidestLeft){
			WidestLeft = w;
		}
	}
	if (WidestLeft > DragWidth){WidestLeft = DragWidth;}

//Calculate the width for the right items.
	DragWidth = Math.floor((ExDivWidth-WidestLeft)/2) - 24;
	RightColPos = ExDivWidth + LeftColPos - (DragWidth + 14 + Indent);
	var Highest = 0;
	var WidestRight = 0;

	for (i=0; i<this.RightItems.length; i++){
		var CurrCard = this.RightItems[i].Card;
		CurrCard.style.width = '';
		CurrCard.style.height = '';
		if (CurrCard.GetW() > DragWidth){CurrCard.style.width = DragWidth + 'px';}
		if (CurrCard.GetH() > Highest){Highest = CurrCard.GetH();}
		if (CurrCard.GetW() > WidestRight){WidestRight = CurrCard.GetW();}
	}

//Size and position the right items.		
	var CurrTop = DragTop;
	
	for (i=0; i<this.RightItems.length; i++){
		var CurrCard = this.RightItems[i].Card;
		CurrCard.style.top = CurrTop + 'px';
		CurrCard.style.left = RightColPos + 'px';
		CurrCard.style.height = Highest + 'px';
		CurrCard.style.width = (WidestRight + 10) + 'px';
		this.RightItems[i].Home = [RightColPos, CurrTop];
		CurrTop = CurrTop + CurrCard.GetH() + DSOffset;
	}

//Size and position the left items.
	CurrTop = DragTop;

	for (var i=0; i<this.LeftItems.length; i++){
		var CurrCard = this.LeftItems[i].Card;
		CurrCard.style.width = WidestLeft + 'px';
		if (CurrCard.GetH() < Highest){CurrCard.style.height = Highest + 'px';}
		CurrCard.style.top = CurrTop + 'px';
		CurrCard.style.left = LeftColPos + 'px';
		CurrTop = CurrTop + CurrCard.GetH() + DSOffset;
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
		var LowestLeft = this.LeftItems[this.LeftItems.length - 1].Card.GetB();
		var LowestRight = this.RightItems[this.RightItems.length - 1].Card.GetB();
		var ReadingBottom = (ReadingDiv)? ReadingDiv.offsetTop + ReadingDiv.offsetHeight : 0;
		BottomNav.style.top = (Math.max(ReadingBottom, LowestLeft, LowestRight) + FontSize) + 'px' ;
		BottomNav.style.width = document.getElementById('TopNavBar').offsetWidth + 'px';
	}
	
//Now slide any already-matched items into position.
	this.RightItems.forEach(function(RI){
		if (RI.MatchedWith > -1){
			var TargPoint = this.GetDockPoint(RI.MatchedWith, RI.Card);
			if (RI.MarkedWrong == true){
				RI.Card.Highlight();
				TargPoint[0] = TargPoint[0] + 10;
			}
			if (slide == true){
				Slide(RI.OrigPos, TargPoint);
			}
			else{
				RI.Card.style.left = TargPoint[0] + 'px';
				RI.Card.style.top  = TargPoint[1] + 'px'; 
			}
		}
	}.bind(this));
};

DragEx.GetDockPoint = function(LeftOrigPos, RightCard){
	var TargL, TargT;
	var LeftItem = this.GetLeftItemByOrigPos(LeftOrigPos);
	if (LeftItem !== null){
		var LeftCard = LeftItem.Card;
		TargL = LeftCard.GetR() + 5;
		TargT = (LeftCard.GetT() + Math.floor((LeftCard.GetH() - RightCard.GetH()) / 2));
		return [TargL, TargT];
	}
	else{
		return [0,0];
	}
}

DragEx.HandleDrop = function(ROrigPos){
	var RI = this.GetRightItemByOrigPos(ROrigPos);
	RI.MarkedWrong = false;
	RI.MatchedWith = -1;
	RI.Card.Unhighlight();
	var Overlap = 0;
	var MatchedWith = -1;
	var i;
	this.LeftItems.forEach(function(LI){
		var OL = RI.Card.GetOverlap(LI.Card);
//Check whether it overlaps a card, or is in exact docking position with it.
		var DP = this.GetDockPoint(LI.OrigPos, RI.Card);
		if ((OL > Overlap)||((RI.Card.GetL() == DP[0])&&(RI.Card.GetT() == DP[1]))){
			Overlap = OL;
			MatchedWith = LI.OrigPos;
		}
	}.bind(this));
	if (MatchedWith > -1){
		RI.MatchedWith = MatchedWith;
		TargPoint = this.GetDockPoint(MatchedWith, RI.Card);
		Slide(ROrigPos, TargPoint);
		this.RightItems.forEach(function(RI2){
			if ((RI2.OrigPos !== RI.OrigPos)&&(RI2.MatchedWith == MatchedWith)){
				RI2.MatchedWith = -1;
				RI2.Card.Unhighlight();
				this.SendHome(RI2.OrigPos);
				RI2.MarkedWrong = false;
			}
		}.bind(this));
	}
	else{
		this.SendHome(ROrigPos);
	}
}

//This function checks answers and calculates the 
//current score, then returns true for "finished" or
//false for "not yet finished". The object's Score
//property can then be read.
DragEx.CheckAnswers = function(){
/*
	Check each right item to see whether a) it had an 
	original match on the left, and b) it is matched
	to a left item whose group is one of its groups.
*/
	if (!this.hasOwnProperty('Penalties')){
		this.Penalties = 0;
	}
	var ItemsToCount = 0;
	var CorrectItems = 0;
	var Done = true; //Assume till proven otherwise.
	
//Tot up the scores.
	this.RightItems.forEach(function(RI){
//Only use it if there is a match for it.
		if (this.GetLeftItemByOrigPos(RI.OrigPos) !== null){
			ItemsToCount++;
			if (RI.MatchedWith !== -1){
				var LI = this.GetLeftItemByOrigPos(RI.MatchedWith);
				if (RI.Groups.indexOf(LI.Group) > -1){
					CorrectItems++;
				}
				else{
					Done = false;
					RI.Card.Highlight();
					RI.MarkedWrong = true;
					RI.Card.style.left = (RI.Card.GetL() + 10) + 'px';
				}
			}
			else{
				Done = false;
			}
		}
		else{
//It's a distractor and shouldn't be matched. Deduct one from score.
			if (RI.MatchedWith !== -1){
				Done = false;
				RI.Card.Highlight();
				RI.Card.style.left = (RI.Card.GetL() + 10) + 'px';
				RI.MarkedWrong = true;
				CorrectItems--;
			}
		}
	}.bind(this));
	if (!this.hasOwnProperty('Score')){
		this.Score = 0;
	}
	this.Score = Math.round((100*(CorrectItems - this.Penalties))/ItemsToCount);
	if (Done === false){
		this.Penalties++;
	}
	return Done;
};

function Slide(ROrigPos, TargPoint){
	var Card = DragEx.GetRightItemByOrigPos(ROrigPos).Card;
	if (Math.abs(Card.GetL() - TargPoint[0]) <= 5){
		Card.style.left = TargPoint[0] + 'px';
	}
	else{
		var LeftShift = Card.GetL() < TargPoint[0]? 5: -5;
		Card.style.left = Card.GetL() + LeftShift + 'px';
	}
	if (Card.GetT() !== TargPoint[1]){
		if (Math.abs(Card.GetT() - TargPoint[1]) <= 5){
			Card.style.top = TargPoint[1] + 'px';
		}
		else{
			var TopShift = Card.GetT() < TargPoint[1]? 5: -5;
			Card.style.top = Card.GetT() + TopShift + 'px';
		}
	}
	if ((Card.GetL() != TargPoint[0])||(Card.GetT() != TargPoint[1])){
		setTimeout('Slide(' + ROrigPos + ', [' + TargPoint[0] + ',' + TargPoint[1] + '])', 1);
	}
}

function TimerStartUp(){
	setTimeout('DragEx.Setup()', 300);
}

function CheckAnswers(){
	if (Locked == true){return;}
	
	var Feedback = '';

	var AllDone = DragEx.CheckAnswers();
	Score = DragEx.Score;
	if (Score < 0){Score = 0;}

	if (AllDone == true){
		Feedback = YourScoreIs + ' ' + Score + '%.<br/>' + CorrectResponse;
	}
	else {
		if (TimeOver == true){
			Feedback = YourScoreIs + ' ' + Score + '%.'
		}
		else{
			Feedback = YourScoreIs + ' ' + Score + '%.' + '<br />' + IncorrectResponse;
		}
	}
	ShowMessage(Feedback);
	
//If the exercise is over, deal with that
	if ((AllDone == true)||(TimeOver == true)){


		TimeOver = true;
		Locked = true;
		Finished = true;
		WriteToInstructions(Feedback);
	}

	
//The window layout may be affected by the feedback, so 
//put the cards in place again.
	DragEx.SetInitialPositions(false);
}









//-->

//]]>


