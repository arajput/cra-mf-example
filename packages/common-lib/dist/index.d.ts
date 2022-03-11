interface Props {
    text: string;
}
export declare const ExampleComponent: ({ text }: Props) => JSX.Element;
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Layout from './components/layout/Layout';
import IconByName from './components/IconByName';
import Widget from './components/Widget';
import Collapsible from './components/Collapsible';
import Menu from './components/Menu';
import DEFAULT_THEME from './components/theme';
export { Header, Footer, Layout, IconByName, Widget, Collapsible, Menu, DEFAULT_THEME };
export * from './services/Auth';
export * from './services/RestClient';
export * from './services/EventBus';
