import React from 'react';
import {Admin, ListGuesser, Resource, ShowGuesser} from 'react-admin';
import {authProvider} from "./utils/authProvider";
import {dataProvider} from "./utils/dataProvider";
import {AccountTreeOutlined, VerifiedUserOutlined} from '@mui/icons-material';
import {SelectionList} from "./features/selection/selection/SelectionList";
import {SelectionCreate} from "./features/selection/selection/SelectionCreate";
import {SelectionEdit} from "./features/selection/selection/SelectionEdit";
import {PortfolioList} from "./features/portfolio/PortfolioList";
import {PortfolioEdit} from "./features/portfolio/PortfolioEdit";
import {StrategyList} from "./features/strategy/StrategyList";
import {StrategyEdit} from "./features/strategy/StrategyEdit";
import {StrategyCreate} from "./features/strategy/StrategyCreate";
import {HistoryList} from "./features/history/HistoryList";
import {HistoryShow} from "./features/history/HistoryShow";
import {CatalogItemList} from "./features/catalog-item/CatalogItemList";
import {CatalogItemShow} from "./features/catalog-item/CatalogItemShow";


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
        <Resource name="selection" list={SelectionList} create={SelectionCreate} edit={SelectionEdit}/>
        <Resource name="portfolio" list={PortfolioList} edit={PortfolioEdit}
                  options={{label: 'Portfolio'}}/>
        <Resource name="catalog-item" list={CatalogItemList} show={CatalogItemShow}
                  options={{label: 'Catalog items'}}/>
        <Resource name="history" list={HistoryList} show={HistoryShow}/>
    </Admin>
);
export default App;