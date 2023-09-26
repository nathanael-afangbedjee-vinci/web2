// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
  
    console.log('POST /pizzas');
  
    if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'
  
    const lastItemIndex = MENU?.length !== 0 ? MENU.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? MENU[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;
  
    const newPizza = {
      id: nextId,
      title: title,
      content: content,
    };
  
    MENU.push(newPizza);
  
    res.json(newPizza);
  });
  