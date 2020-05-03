import json
from pymongo import MongoClient
from pathlib import Path
import pprint
import pypeln.thread as th
from tqdm import tqdm

DATA_DIR = Path('./AllDeckFiles')

mongo = MongoClient()
magic = mongo.magic
cards = magic.cards
decks = magic.decks

decks.drop()

files = list(DATA_DIR.glob('*.json'))
print(f'Importing {len(files)} decks')


def convert_deck_cards(deck):
    converted_deck = {'name': deck['name'], 'cards': []}
    for card in deck['mainBoard']:
        stored_card = cards.find_one({'scryfallId': card['scryfallId']})
        if stored_card is None:
            continue
        else:
            [stored_card['_id']]
            converted_deck['cards'] +=  [stored_card['_id']] * card['count']
        
    converted_deck['default'] = True
    return converted_deck

def read_convert_store_deck(filepath):
    with open(filepath, 'r') as f:
        deck = json.load(f)
        converted_deck = convert_deck_cards(deck)
        decks.insert_one(converted_deck)

stage = tqdm(th.map(read_convert_store_deck, files, workers=8))
list(stage)
