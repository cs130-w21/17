/**
 * We will not be using any of these api files. They are
 * only examples for making api calls to the backend.
 */
import { Router } from 'express';
// Item Model
import Item from '../../models/Item';

const router = Router();

/**
 * A GET request to get Items.
 *
 * @name GetItems
 * @route  {GET} api/items
 * @bodyparam {ParamType} [paramName] Param description.
 */

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    if (!items) throw Error('No items');

    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});






export default router;
