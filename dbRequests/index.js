export const getAllItemsWithTopComment = async () =>
  db.all(`
SELECT * FROM (
  SELECT
    Item.id,
    Item.name,
    Comment.id as commentId,
    Comment.content as commentContent,
    Comment.numberOfStars as commentNumberOfStars
  FROM Item, Comment
  WHERE Item.id = Comment.itemId
) ItemAndComment
WHERE ItemAndComment.commentId IN (
  SELECT Comment.id FROM Comment
  WHERE Comment.itemId = ItemAndComment.id
  ORDER BY Comment.numberOfStars DESC
  LIMIT 1
)
ORDER BY ItemAndComment.id, ItemAndComment.commentNumberOfStars DESC
`);

export const getItemDetailsWithTopThreeComments = async itemId =>
  db.all(`
SELECT
  Item.id,
  Item.name,
  Item.description,
  Comment.id as commentId,
  Comment.content as commentContent,
  Comment.numberOfStars as commentNumberOfStars
FROM Item, Comment
WHERE
  Item.id = ${itemId} AND
  Item.id = Comment.itemId
ORDER BY commentNumberOfStars DESC
LIMIT 3
`);

export const incrementNumberOfStarsForComment = id =>
  db.run(
    `UPDATE Comment SET numberOfStars = numberOfStars + 1 WHERE id = ${id}`
  );
