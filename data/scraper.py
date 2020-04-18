import requests
import tqdm
import json
import pandas as pd
from pypeln import process, thread
from pathlib import Path

with open('./AllCards.json') as f:
    cards = json.load(f)

cards_df = pd.DataFrame(cards)
SAVE_DIR = Path('/home/francesco/Documents/MagicCardsArtCrop')
SAVE_DIR.mkdir(exist_ok=True)

bar = tqdm.tqdm


def store_card_img(i, row):
    scryfallId = row['scryfallId']
    url = f'https://api.scryfall.com/cards/{scryfallId}?format=image&version=art_crop'
    res = requests.get(url)

    file = open(f"{SAVE_DIR}/{scryfallId}.jpg", "wb")
    file.write(res.content)
    file.close()

stage = bar(process.map(lambda x: store_card_img(*x), cards_df.iterrows(),  workers=12), total=cards_df.shape[0])
list(stage)