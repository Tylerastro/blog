from glob import glob

from bs4 import BeautifulSoup

PROPS = {
    'frameborder': 'frameBorder',
    'allowfullscreen': 'allowFullScreen',
}


def convertProp(file):
    # read file and rewrite the PROPS if in PROPS
    with open(file, "r") as f:
        content = f.readlines()
        for idx, line in enumerate(content):
            if 'iframe' in line:
                soup = BeautifulSoup(line, "html.parser")
                # find src
                src = soup.find("iframe").get("src")
                url = src.split('https://www.youtube.com/embed/')[1]
                line = f'<YouTube id="{url}" />'
                content[idx] = line

    with open(file, "w") as f:
        f.write(" ".join(content))


if __name__ == "__main__":
    for file in glob("./contents/*.mdx"):
        convertProp(file)
