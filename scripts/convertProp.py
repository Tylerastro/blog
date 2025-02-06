from glob import glob

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
                line = line.replace('\n', '')
                for key, value in PROPS.items():
                    if key in line:
                        line = line.replace(key, value)
                line = line.replace('iframe', 'iframe className="wrapper"', 1)
                content[idx] = f'<YouTubePlayer>{line}</YouTubePlayer>'

    with open(file, "w") as f:
        f.write(" ".join(content))


if __name__ == "__main__":
    for file in glob("./contents/*.mdx"):
        convertProp(file)
