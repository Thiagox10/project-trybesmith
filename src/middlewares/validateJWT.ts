import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import StatusCode from '../enums/StatusCode';
import { TokenInterface } from '../interfaces/TokenInterface';
import userModel from '../models/userModel';

// const { User } = require('../../models');

const secret = 'xablau';

const validateJwt = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  
  /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
  if (!token) {
    return res.status(StatusCode.UNAUTHORIZED).json({ error: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret) as TokenInterface;
    // console.log(decoded);
    const { id, username } = decoded.data;

    /* Caso o token esteja expirado, a própria biblioteca irá retornar um erro,
       por isso não é necessário fazer validação do tempo.
       Caso esteja tudo certo, nós então buscamos o usuário na base para obter seus dados atualizados */

    const [user] = await userModel.getUser(id, username);
    
    /* Não existe um usuário na nossa base com o id informado no token. */
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto req.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência */
    // req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default validateJwt;