const ACTIONS = {
    NEW_DECK: 'NEW_DECK',    NEW_ROOM: 'NEW_ROOM',    NONE: 'NONE'
}

const COLORS = ['B', 'G', 'R', 'U', 'W']
const TYPES = ['Creature', 'Artifact', 'Enchantment',    'Instant', 'Land', 'Sorcery', 'Planeswalker']

const SUBTYPES = ['Adventure','Advisor','Aetherborn','Ajani','Alara','Alicorn','Alien','Ally','Aminatou','Angel','Angrath','Antelope','Ape','Arcane','Archer','Archon','Arkhos','Arlinn','Art','Artificer','Ashiok','Assassin','Assembly-Worker','Atog','Aura','Aurochs','Avatar','Azgol','Azra','B.O.B.','Baddest,','Badger','Barbarian','Basilisk','Bat','Bear','Beast','Beaver','Beeble','Beholder','Belenon','Berserker','Biggest,','Bird','Boar','Bolas','Bolas’s Meditation Realm','Brainiac','Bringer','Brushwagg','Bureaucrat','Calix','Camel','Carrier','Cartouche','Cat','Centaur','Cephalid','Chameleon','Chandra','Chicken','Child','Chimera','Citizen','Clamfolk','Cleric','Cloud','Cockatrice','Construct','Contraption','Cow','Crab','Crocodile','Curse','Cyborg','Cyclops','Dack','Daretti','Dauthi','Davriel','Deer','Demigod','Demon','Desert','Designer','Devil','Dinosaur','Djinn','Dog','Dominaria','Domri','Donkey','Dovin','Dragon','Drake','Dreadnought','Drone','Druid','Dryad','Dungeon','Dwarf','Efreet','Egg','Elder','Eldrazi','Elemental','Elemental?','Elephant','Elf','Elk','Elspeth','Equilor','Equipment','Ergamon','Estrid','Etiquette','Eye','Fabacin','Faerie','Ferret','Fire','Fish','Flagbearer','Food','Forest','Fortification','Fox','Freyalise','Frog','Fungus','Gamer','Gargoyle','Garruk','Gate','Giant','Gideon','Gnome','Goat','Goblin','God','Golem','Gorgon','Grandchild','Gremlin','Griffin','Gus','Hag','Harpy','Hatificer','Head','Hellion','Hero','Hippo','Hippogriff','Homarid','Homunculus','Horror','Horse','Hound','Huatli','Human','Hydra','Hyena','Igpay','Illusion','Imp','Incarnation','Innistrad','Insect','Inzerva','Iquatana','Ir','Island','Jace','Jackal','Jaya','Jellyfish','Juggernaut','Kaldheim','Kamigawa','Kangaroo','Karn','Karsus','Kasmina','Kavu','Kaya','Kephalai','Key','Kinshala','Kiora','Kirin','Kithkin','Knight','Kobold','Kolbahan','Kor','Koth','Kraken','Kyneth','Lady','Lair','Lamia','Lammasu','Leech','Legend','Leviathan','Lhurgoyf','Licid','Liliana','Lizard','Lobster','Locus','Lorwyn','Luvion','Mammoth','Manticore','Master','Masticore','Mercadia','Mercenary','Merfolk','Metathran','Mime','Mine','Minion','Minotaur','Mirrodin','Moag','Mode','Mole','Monger','Mongoose','Mongseng','Monk','Monkey','Moonfolk','Mountain','Mummy','Muraganda','Mutant','Myr','Mystic','Naga','Nahiri','Narset','Nastiest,','Nautilus','Nephilim','New Phyrexia','Nightmare','Nightstalker','Ninja','Nissa','Nixilis','Noble','Noggle','Nomad','Nymph','Octopus','Ogre','Oko','Ooze','Orc','Orgg','Ouphe','Ox','Oyster','Pangolin','Paratrooper','Peasant','Pegasus','Penguin','Pest','Phelddagrif','Phoenix','Phyrexia','Phyrexian','Pilot','Pirate','Plains','Plant','Power-Plant','Praetor','Processor','Proper','Pyrulea','Rabbit','Rabiah','Raccoon','Ral','Rat','Rath','Ravnica','Rebel','Reflection','Regatha','Rhino','Rigger','Rogue','Rowan','Sable','Saga','Saheeli','Salamander','Samurai','Samut','Sarkhan','Satyr','Scarecrow','Scientist','Scorpion','Scout','Segovia','Serpent','Serra','Serra’s Realm','Shade','Shadowmoor','Shaman','Shandalar','Shapeshifter','Sheep','Ship','Shrine','Siren','Skeleton','Slith','Sliver','Slug','Snake','Soldier','Soltari','Sorin','Spawn','Specter','Spellshaper','Sphinx','Spider','Spike','Spirit','Sponge','Spy','Squid','Squirrel','Starfish','Surrakar','Swamp','Tamiyo','Teferi','Teyo','Tezzeret','Thalakos','The','Thopter','Thrull','Tibalt','Tower','Townsfolk','Trap','Treefolk','Trilobite','Troll','Turtle','Ugin','Ulgrotha','Unicorn','Urza','Urza’s','Valla','Vampire','Vampyre','Vedalken','Vehicle','Venser','Viashino','Villain','Vivien','Volver','Vraska','Vryn','Waiter','Wall','Warlock','Warrior','Weird','Werewolf','Whale','Wildfire','Will','Windgrace','Wizard','Wolf','Wolverine','Wombat','Worm','Wraith','Wrenn','Wrestler','Wurm','Xenagos','Xerex','Yanggu','Yanling','Yeti','Zendikar','Zombie','Zubera']

const DECK_TYPES = ['Advanced Deck','Advanced Pack','Archenemy Deck','Basic Deck','Brawl Deck','Challenger Deck','Clash Pack','Commander Deck','Duel Deck','Duel Of The Planeswalkers Deck','Event Deck','Game Night Deck','Guild Kit','Halfdeck','Intro Pack','MTGO Theme Deck','Planechase Deck','Planeswalker Deck','Premium Deck','Spellslinger Starter Kit','Starter Deck','Theme Deck','Welcome Deck']
const MANAS = [1,2,3,4,5,6,7,8,9,'10 +']

const filterMagicCards = (cards, filter) => {
    let filteredCards = [...cards]
    if (filter.colors) filteredCards = cards.filter(c => c.colors.indexOf(filter.colors[0]) >= 0)
    if (filter.type) filteredCards = cards.filter(c => c.types.indexOf(filter.type) >= 0)
    if (filter.subtype) filteredCards = cards.filter(c => c.subtypes.indexOf(filter.subtype) >= 0)
    if (filter.convertedManaCost) filteredCards = cards.filter(c => c.convertedManaCost === Number(filter.convertedManaCost))

    return filteredCards
}
// const TYPES = ['Artifact', 'Conspiracy', 'Creature',// 'Eaturecray', 'Elemental', 'Enchantment',// 'Instant', 'Land', 'Phenomenon', 'Plane', 'Planeswalker',// 'Scariest', 'Scheme', , 'Sorcery', 'Specter', 'Summon',// 'Tribal', 'Vanguard']
const frequency = (array) => {
    let freq = {}
    let freqArray = []
    for (let el of array) {
        freq[el] = freq[el] ? freq[el] + 1 :1
    }

    for(let key of Object.keys(freq)) {
        const val = freq[key]
        freqArray.push({ key, val})

    }

    freqArray.sort(( a,b ) => a.val > b.val ? -1 : 1 )    
    
    return freqArray
}

const uniqueFromArray = (array, uniques={}) => {

    array.forEach(el => uniques[el] = 0)

    return uniques
}

const uniqueFromDict = (array, field) => {
    let uniques = {}
    array.forEach(el => {
        const val = el[field]
        if(val.length) {
            uniqueFromArray(val, uniques)
        }
    })

    return uniques
}
export { ACTIONS, COLORS, TYPES, DECK_TYPES, filterMagicCards, frequency, SUBTYPES, MANAS, uniqueFromDict }