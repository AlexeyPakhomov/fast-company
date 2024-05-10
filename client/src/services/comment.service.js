import url from '../config/url';
import httpService from './http.service';
import config from '../config.json';

const commentService = {
  createComment: async (comment) => {
    let commentData;
    if (config.isFirebase) {
      commentData = await httpService.put(url.comment + comment._id, comment);
    } else {
      commentData = await httpService.post(url.comment, comment);
    }
    return commentData.data;
  },
  getComments: async (pageId) => {
    let comments;
    if (config.isFirebase) {
      comments = await httpService.get(url.comment, {
        params: {
          orderBy: JSON.stringify('pageId'),
          equalTo: JSON.stringify(pageId),
        },
      });
    } else {
      comments = await httpService.get(url.comment, {
        params: {
          orderBy: 'pageId',
          equalTo: pageId,
        },
      });
    }
    return comments.data;
  },
  deleteComment: async (commentId) => {
    const { data } = await httpService.delete(url.comment + commentId);
    return data;
  },
};

export default commentService;
