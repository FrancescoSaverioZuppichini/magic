import json
from pymongo import MongoClient
from pathlib import Path
import pprint
import pypeln.thread as th
from tqdm import tqdm
from bson.objectid import ObjectId
from datetime import datetime
from collections import defaultdict
DATA_DIR = Path('./AllDeckFiles/')

mongo = MongoClient()
magic = mongo.magic
cards = magic.cards
decks = magic.decks

decks.drop()

files = list(DATA_DIR.glob('*.json'))
print(f'Importing {len(files)} decks')


def convert_deck_cards(deck):
    try:
        converted_deck = {'name': deck['name'],
                        'cards': [], 'type': deck['type'],
                        'releaseDate': datetime.strptime(deck['releaseDate'], '%Y-%m-%d')}
        # we also need to compute the deck stats
        colors = []
        for card in deck['mainBoard']:
            stored_card = cards.find_one({'scryfallId': card['scryfallId']})
            colors += stored_card['colors']
            if stored_card is None:
                continue
            else:
                [stored_card['_id']]
                converted_deck['cards'] += [
                    ObjectId(stored_card['_id'])] * card['count']

        converted_deck['default'] = True
        # create the colors field
        freq = defaultdict(int)

        for color in colors:
            freq[color] += 1

        deck_stats = [{'count': v, 'color' : k} for k,v in freq.items()]
        deck_stats = sorted(deck_stats, key=lambda a : -a['count'])
        converted_deck['colors'] = deck_stats
        return converted_deck

    except TypeError as e:
        print(e)
        return None


def read_convert_store_deck(filepath):
    with open(filepath, 'r') as f:
        deck = json.load(f)
        converted_deck = convert_deck_cards(deck)
        if converted_deck is not None:
            decks.insert_one(converted_deck)


stage = tqdm(th.map(read_convert_store_deck, files, workers=8))
list(stage)
