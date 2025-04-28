# move all post folders to public folder
# find directory under markdown and copy to public folder
find ./markdown -maxdepth 1 -type d -exec cp -v -r {} ./public/blogs/ \;