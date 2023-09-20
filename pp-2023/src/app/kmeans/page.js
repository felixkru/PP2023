import ClientElements from '../kmeans/client-elements'
import 'server-only';

export default function SiteKMeans() {

    const gridRow = 'row';
    const gridColumn = 'col-12 col-md-6';

    return (
        <div className="container">
            <div className={gridRow}>
                <div className={gridColumn}>
                    <ClientElements/>
                </div>
            </div>
        </div>
    );
};