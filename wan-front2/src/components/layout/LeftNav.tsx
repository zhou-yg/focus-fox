import React from 'react';
import { Link } from "react-router-dom";

interface LeftNavItem {
    index ?: number;
    type: 'header' | 'child-header' | 'header-top';
    name: string;
    href : string;
    children : Array<LeftNavItem>;
}

const categoryNames = [
  '动作',
  '角色扮演',
  '射击',
  '运动',
  '益智',
  '策略',
  '冒险',
  '竞速',
  '棋牌',
  '桌面',
  '战略模拟',
  '格斗',
  '合集',
  '其它',
];

const leftNavConfig: Array<LeftNavItem> = [
  {
    type: 'header',
    name: '我的记录',
    href: '/wan/record',
    children: [],
  },
  {
    type: 'header',
    name: '游戏库',
    href: '/wan/repo',
    children: [],
  },
  {
    type: 'header-top',
    name: '游戏分类',
    href: '',
    children: categoryNames.map((name, index) => {
      let r: LeftNavItem = {
        type: 'child-header',
        name,
        index,
        href: `/wan/category/${index + 1}`,
        children: [],
      };
      return r;
    }),
  },
]

function LeftNav() {
  return (
    <div className="left-nav">
      {leftNavConfig.map(item => {
        if (item.type === 'header') {
          return (
            <div key={item.href} className="row">
              <Link  to={item.href}>
                <div className="header pointer">{item.name}</div>
              </Link>
            </div>
          );
        } else if (item.type === 'header-top') {
          return (
            <div key={item.name} className="row">
              <div  className="header-top">
                {item.name}
                <div className="bottom-list">
                  <ul>
                    {item.children.map(childItem => {
                      return (
                        <li key={childItem.href} className="pointer" >
                          <Link to={childItem.href}>{childItem.name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default LeftNav;
