G.AddData({
name:'Human generators and God\'s damain',
author:'NotOrteil',
desc:'A simple mod for reaching bounds no man ever has.',
engineVersion:1,
manifest:'modManifest.js',
requires:['Default dataset*'],
sheets:{'spicySheet':'https://github.com/Aeolus1229/Olympus/blob/JSProjects/vampModIconSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	//The idea in this simple example mod is to add a few elements focused around hot sauce, because hot sauce is great and I use that stuff everywhere.
	
	//First we create a couple new resources :
	new G.Res({
		name:'Blood',
		desc:'Delicious...',
		icon:[0,0,'spicySheet'],
		turnToByContext:{'eat':{'health':0.03,'happiness':-0.03},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'Life Essence',
		desc:'[Life Essence] the basic unit for the creation of life. don\'t let your biology teacher tell you otherwise.',
		icon:[1,0,'spicySheet'],
		turnToByContext:{'eat':{'health':0.1,'happiness':-0.01},'decay':{'hot sauce':0.95,'spoiled food':0.05}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		partOf:'food',
		category:'food',
	});
	
	//Then we augment the base data to incorporate our new resources :
		//adding hot pepper as something that can be gathered from grass
	G.getDict('grass').res['gather']['Blood']=3;
		//adding a new mode to artisans so they can make hot sauce from hot peppers
	G.getDict('artisan').modes['Life Essence']={name:'Get Essence',desc:'Turn 3 [Blood] and 3 [bone]s into 1 [Life Essence].',req:{'God\'s Playground' :true},use:{'stone  tools':1}};
		//adding a new effect to artisans that handles the actual hot sauce preparing and is only active when the unit has the mode "hot sauce"
	G.getDict('artisan').effects.push({type:'convert',from:{'Blood':3,'bone':3},into:{'Life Essence':1},every:3,mode:'Life Essence'});
	
	//Then we add a new technology which is required by the artisans to gain access to the "hot sauce" mode :
	new G.Tech({
		name:'Life Rending',
		desc:'@[artisan]s can now produce [Life Essence] from [Blood] and [bone]s//This allows the artisan to rend life forces of others into a one of a kind life source.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':50},
		req:{'healing':true},
	});
	
	//Finally, we add a trait that amplifies the benefits of consuming hot sauce; it will take on average 20 years to appear once the conditions (knowing the "Hot sauce preparing" tech) is fulfilled.
	new G.Trait({
		name:'Blood Lust',
		desc:'@your people appreciate [Blood] twice as much and will be Very happy from consuming it.',
		icon:[1,1,'spicySheet'],
		chance:10,
		req:{'life rending':true},
		effects:[
			{type:'function',func:function(){G.getDict('Life Eseence').turnToByContext['eat']['happiness']=0.4;}},//this is a custom function executed when we gain the trait
		],
	});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!
}
});
