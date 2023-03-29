import React from 'react';
import {Admin, Resource, ListGuesser, ShowGuesser, EditGuesser} from 'react-admin';
import {authProvider} from "./utils/authProvider";
import {dataProvider} from "./utils/dataProvider";
import { AccountTreeOutlined, VerifiedUserOutlined } from '@mui/icons-material';
import {SelectionItemCreate} from "./features/selection/selection-item/SelectionItemCreate";
import {SelectionItemList} from "./features/selection/selection-item/SelectionItemList";
import {SelectionItemEdit} from "./features/selection/selection-item/SelectionItemEdit";
import {SelectionList} from "./features/selection/selection/SelectionList";
import {SelectionCreate} from "./features/selection/selection/SelectionCreate";
import {SelectionEdit} from "./features/selection/selection/SelectionEdit";
import {PortfolioList} from "./features/portfolio/PortfolioList";
import {PortfolioEdit} from "./features/portfolio/PortfolioEdit";
import {PortfolioCreate} from "./features/portfolio/PortfolioCreate";
import {StrategyList} from "./features/strategy/StrategyList";
import {StrategyEdit} from "./features/strategy/StrategyEdit";
import {StrategyCreate} from "./features/strategy/StrategyCreate";
import {HistoryList} from "./features/history/HistoryList";
import {HistoryShow} from "./features/history/HistoryShow";


const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="users" list={ListGuesser} show={ShowGuesser} icon={VerifiedUserOutlined}/>
        <Resource
                name="strategy"
          list={StrategyList}
          edit={StrategyEdit}
          create={StrategyCreate}
          icon={AccountTreeOutlined}
        />
        <Resource name="selection" list={SelectionList} create={SelectionCreate} edit={SelectionEdit} />
        <Resource
            name="selection-item"
            list={SelectionItemList}
            create={SelectionItemCreate}
            edit={SelectionItemEdit}
            options={{ label: 'Selection items' }} />
        <Resource name="portfolio" list={PortfolioList} edit={PortfolioEdit} create={PortfolioCreate} />
        <Resource name="history" list={HistoryList} show={HistoryShow} />
    </Admin>
);
export default App;