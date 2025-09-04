from glob import glob

from bs4 import BeautifulSoup

PROPS = {
    'frameborder': 'frameBorder',
    'allowfullscreen': 'allowFullScreen',
}


def convertProp(file):
    # read file and rewrite the PROPS if in PROPS
    try:
        with open(file, "r") as f:
            content = f.readlines()
            for idx, line in enumerate(content):
                if 'iframe' in line:
                    soup = BeautifulSoup(line, "html.parser")
                    # find src
                    iframe = soup.find("iframe")
                    if iframe and iframe.get("src"):
                        src = iframe.get("src")
                        if 'https://www.youtube.com/embed/' in src:
                            url = src.split('https://www.youtube.com/embed/')[1]
                            line = f'<YouTube id="{url}" />'
                            content[idx] = line

        with open(file, "w") as f:
            f.write(" ".join(content))
    except Exception as e:
        print(f"Error processing {file}: {e}")
        # Skip this file and continue


if __name__ == "__main__":
    for file in glob("./contents/*.mdx"):
        convertProp(file)
