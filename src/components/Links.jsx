import IconLocation from "./icons/IconLocation.jsx"
import IconTwitter from "./icons/IconTwitter.jsx"
import IconWebsite from "./icons/IconWebsite.jsx"
import IconCompany from "./icons/IconCompany.jsx"

const MAX_BLOG_URL_LENGTH = 20
const MAX_BLOG_DISPLAY_LENGTH = 16
const availableInfo = (info) => info !== null && info !== "";

const LinkComponent = ({ info, Icon, url, children}) => {

    return (
        availableInfo(info)
            ? (
                <div>
                    <Icon />
                    <a href={url} target="_blank">{children}</a>
                </div>
            )
            : (
                <div>
                    <Icon className={"no-available-info"}/>
                    <p className="no-available-info">Not Available</p>
                </div>
            )
    )
}

const Links = ({ links }) => {
    const [blog, twitter_username, company, location] = links

    // Remove http://, https:// and www. from the blog URL
    const cleanUpBlogURL = (blog) => blog.replace(/(^\w+:|^)\/\//, '').replace(/www./, '');

    function shortenBlogURL(blog) {
        if (blog.length > MAX_BLOG_URL_LENGTH) {
            const shortBlog = blog.slice(0, MAX_BLOG_DISPLAY_LENGTH) + "..."
            return shortBlog
        } else {
            return blog
        }
    }

    return (
        <div className="links">
            <LinkComponent 
                info={location}
                Icon={IconLocation}
                url={location}
            >
                {location}
            </LinkComponent>

            <LinkComponent 
                info={twitter_username}
                Icon={IconTwitter}
                url={`https://twitter.com/${twitter_username}`}
            >
                {twitter_username}
            </LinkComponent>

            <LinkComponent 
                info={blog}
                Icon={IconWebsite}
                url={blog}
            >
                {blog ? shortenBlogURL(cleanUpBlogURL(blog)) : blog}
            </LinkComponent>

            <LinkComponent 
                info={company}
                Icon={IconCompany}
                url={'https://github.com/' + ( company ? company.replace(/\s/g, "") : '' )} // Remove spaces from the company name
            >
                {company}
            </LinkComponent>
        </div>
    )
}

export default Links