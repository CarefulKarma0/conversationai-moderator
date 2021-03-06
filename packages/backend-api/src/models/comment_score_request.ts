/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import * as Sequelize from 'sequelize';

import { sequelize } from '../sequelize';
import { ICommentInstance } from './comment';
import { IBaseAttributes, IBaseInstance } from './constants';

export interface ICommentScoreRequestAttributes extends IBaseAttributes {
  commentId?: number;
  userId?: number;
  sentAt: Date | Sequelize.fn;
  doneAt?: Date | Sequelize.fn | null;
}

export type ICommentScoreRequestInstance = Sequelize.Instance<ICommentScoreRequestAttributes> &
  ICommentScoreRequestAttributes & IBaseInstance & {
  getComment: Sequelize.BelongsToGetAssociationMixin<ICommentInstance>;
};

/**
 * CommentScoreRequest model
 */
export const CommentScoreRequest = sequelize.define<
  ICommentScoreRequestInstance,
  ICommentScoreRequestAttributes
>('comment_score_request', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },

  commentId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },

  userId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },

  sentAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  doneAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

CommentScoreRequest.associate = (models) => {
  CommentScoreRequest.belongsTo(models.Comment);
  CommentScoreRequest.belongsTo(models.User);
};
