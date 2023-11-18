import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Connection, ClientSession } from 'mongoose';
import errorHandler from './errorHandler';
import dbConnect from '../../lib/dbConnect';

type HttpMethods =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'patch';

type Handler = {
  [k in HttpMethods]?: NextApiHandler;
};

function apiHandler(handler: Handler) {
  // eslint-disable-next-line consistent-return
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method!.toLowerCase() as HttpMethods;

    // check handler supports HTTP method
    if (!handler[method]) {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    let session: ClientSession | null = null;

    try {
      const conn: Connection = await dbConnect();
      session = await conn.startSession();
      session.startTransaction();

      // route handler
      await handler[method]!(req, res);

      session.commitTransaction();
    } catch (err) {
      session?.abortTransaction();

      // global error handler
      return errorHandler(err, res);
    } finally {
      session?.endSession();
    }
  };
}

export default apiHandler;
