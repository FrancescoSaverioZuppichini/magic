import requests
import tqdm
import json
import pandas as pd
from pypeln import process, thread
from pathlib import Path

with open('./data/AllCards.json') as f:
    cards = json.load(f)

cards_df = pd.DataFrame(cards)
SAVE_DIR = Path('/home/francesco/Documents/MagicCards')

SAVE_DIR.mkdir(exist_ok=True)

bar = tqdm.tqdm

def store_card_img(i, row):
    scryfallId = row['scryfallId']
    url = f'https://api.scryfall.com/cards/{scryfallId}?format=image'
    res = requests.get(url)
    # bar.update(1)
    # bar.set_description(f'{res.status_code} - {scryfallId}')

    file = open(f"{SAVE_DIR}/{scryfallId}.jpg", "wb")
    file.write(res.content)
    file.close()

stage = bar(process.map(lambda x: store_card_img(*x), cards_df.iterrows(),  workers=12), total=cards_df.shape[0])
list(stage)